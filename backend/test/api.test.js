const request = require('supertest');
const app = require('../src/index'); // 🔹 Ahora está bien importado

describe('Pruebas de autenticación', () => {
    let testToken = '';

    it('Debe registrar un usuario', async () => {
        const res = await request(app).post('/api/auth/register').send({
            nombre: 'Test',
            correo: 'test@email.com',
            password: '123456',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
    });

    it('Debe iniciar sesión', async () => {
        const res = await request(app).post('/api/auth/login').send({
            correo: 'test@email.com',
            password: '123456',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        testToken = res.body.token; // Guardamos el token para pruebas futuras
    });

    it('Debe acceder a una ruta protegida con un token válido', async () => {
        const res = await request(app)
            .get('/api/protegida')
            .set('Authorization', `Bearer ${testToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Acceso permitido');
    });
});
