import jwt from 'jsonwebtoken'
import db from '../database/db.js'

export function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                type: user.type
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h'}
        );

        res.json({ token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}