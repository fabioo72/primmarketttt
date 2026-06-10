import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    email: String,
    discord: String,
    subject: String,
    status: {
        type: String,
        default: 'open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    messages: [
        {
            role: String, // 'user' | 'admin' | 'system'
            content: String,
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

// Prevent overwrite of model if already compiled
export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
