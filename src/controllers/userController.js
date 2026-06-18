import db from '../database/db.js';
import { createUserSchema } from '../schemas/schema.js';

export function createUser(req, res) {
    try {
        const { name, email, password, type } = req.body;

        const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

        if (exists) {
            return res.status(409).json({ message: 'E-mail já cadastrado' });
        }

        db.prepare('INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)')
            .run(name, email, password, type);

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, type } = req.body;

        const user = db.prepare('SELECT id FROM users WHERE id = ?').get(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        db.prepare('UPDATE users SET name = ?, email = ?, type = ? WHERE id = ?').run(name, email, type, id);
        res.status(201).json({ message: 'Usuário atualizado com sucesso!'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export function getUsers(req, res) {
    try {
        const users = db.prepare('SELECT id, name, email, type FROM users').all();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}