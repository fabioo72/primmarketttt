import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';

export async function GET(req, { params }) {
    await dbConnect();
    const { id } = await params;

    try {
        const ticket = await Ticket.findOne({ id: id });
        if (!ticket) {
            return Response.json({ error: 'Ticket not found' }, { status: 404 });
        }
        return Response.json(ticket);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    try {
        const ticket = await Ticket.findOne({ id: id });

        if (!ticket) {
            return Response.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Add reply
        ticket.messages.push({
            role: body.role || 'admin',
            content: body.message,
            timestamp: new Date()
        });

        // Update status if provided
        if (body.status) {
            ticket.status = body.status;
        }

        await ticket.save();

        return Response.json(ticket);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
