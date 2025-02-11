const request = require('supertest');
const app = require('../src/index');

describe('Pruebas de autenticación', () => {
    it('Debe registrar un usuario', async () => {
        const res = await request(app).post('/api/auth/register').send({
            nombre: 'Test',
            correo: 'test@email.com',
            password: '123456',
        });
        expect(res.statusCode).toBe(200);
    });

    it('Debe iniciar sesión', async () => {
        const res = await request(app).post('/api/auth/login').send({
            correo: 'test@email.com',
            password: '123456',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
