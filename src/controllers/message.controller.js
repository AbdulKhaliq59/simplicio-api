import User from "../database/models/user.js";
import ChatMessage from "../database/models/message.js";


export const sendMessage = async (req, res) => {
    try {
        let senderEmail;

        // Check if user is authenticated
        if (req.user && req.user.email) {
            senderEmail = req.user.email; // Use email from the token
            console.log("Authenticated sender email:", senderEmail);
        } else {
            // If not authenticated, require sender information in the request body
            const { senderName, senderEmail: manualSenderEmail } = req.body;
            if (!manualSenderEmail || !senderName) {
                return res.status(400).json({
                    error: 'Sender information is required for unauthenticated users.'
                });
            }
            senderEmail = manualSenderEmail;
            console.log("Unauthenticated sender email:", senderEmail);
        }

        const { receiverEmail, message } = req.body;

        // Ensure the receiver exists
        const receiver = await User.findOne({ email: receiverEmail });
        if (!receiver) {
            return res.status(404).json({
                error: 'Receiver not found',
            });
        }

        // Create and save the chat message
        const chatMessage = new ChatMessage({
            senderEmail,
            receiverEmail,
            message,
        });
        await chatMessage.save();

        console.log('Message saved:', chatMessage); // Log the saved message for debugging

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};



export const getMessage = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const { contactEmail } = req.query;
        const message = await ChatMessage.find({
            $or: [
                {
                    senderEmail: userEmail, receiverEmail: contactEmail
                },
                {
                    senderEmail: contactEmail, receiverEmail: userEmail
                }
            ]
        }).sort({ timestamp: 1 })

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to receive messages' })
    }
}


export const getConversationUsers = async (req, res) => {
    try {
        // Get all unique users who have sent or received messages with the current user
        const userEmail = req.user ? req.user.email : null;
        console.log("UserEmail");
        // Find all unique users who have sent or received messages with the current user (authenticated or unauthenticated)
        const conversationUsers = await ChatMessage.aggregate([
            {
                $match: {
                    $or: [
                        { senderEmail: userEmail }, // Authenticated user's email
                        { receiverEmail: userEmail },
                        { senderEmail: { $ne: null } }, // Include messages from unauthenticated users
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderEmail", userEmail] },
                            "$receiverEmail",
                            "$senderEmail"
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "email",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    email: "$user.email",
                    name: "$user.name"
                }
            }
        ]);

        console.log("Conversation users:", conversationUsers);
        return res.status(200).json(conversationUsers);
    } catch (error) {
        console.error("Error retrieving conversation users:", error);
        return res.status(500).json({ error: 'Failed to get conversation users' });
    }
};

export const listConversations = async (req, res) => {
    try {
        const { email } = req.user; // Assume the manager is authenticated

        // Fetch distinct senders and receivers in conversations with the authenticated user
        const conversations = await ChatMessage.aggregate([
            {
                $match: {
                    $or: [
                        { senderEmail: email },
                        { receiverEmail: email }
                    ]
                }
            },
            {
                $group: {
                    _id: null, // Grouping by null to combine results into a single group
                    uniqueUsers: {
                        $addToSet: {
                            $cond: {
                                if: { $eq: ["$senderEmail", email] },
                                then: { email: "$receiverEmail", name: "$receiverName" },
                                else: { email: "$senderEmail", name: "$senderName" }
                            }
                        }
                    }
                }
            }
        ]);

        console.log("Conversations:", conversations);

        // Extract unique user details (array of objects with email and name)
        const uniqueUserDetails = conversations.length > 0 ? conversations[0].uniqueUsers : [];

        // Return the list of unique user emails and names
        res.status(200).json(uniqueUserDetails);
    } catch (error) {
        console.error("Error listing conversations:", error);
        res.status(500).json({ error: 'Failed to list conversations' });
    }
};






export const listAllMessages = async (req, res) => {
    try {
        // Fetch all messages from the ChatMessage collection
        const messages = await ChatMessage.find();

        // Log the messages to check the database content
        console.log("All messages:", messages);

        // Return the messages in the response
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};