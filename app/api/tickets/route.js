import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';

export async function GET(req) {
    await dbConnect();

    // Protect this route
    const secret = req.headers.get('x-admin-secret');
    if (secret !== 'admin123') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const tickets = await Ticket.find({});
        return Response.json(tickets);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();

        const newTicket = await Ticket.create({
            id: Math.random().toString(36).substr(2, 9),
            name: body.name,
            email: body.email,
            discord: body.discord,
            subject: body.subject,
            messages: [
                {
                    role: 'user',
                    content: body.message,
                    timestamp: new Date()
                }
            ]
        });

        return Response.json(newTicket);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
