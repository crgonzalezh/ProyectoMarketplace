const request = require('supertest');
const app = require('../src/index');

let testToken;
const randomEmail = `test${Date.now()}@email.com`;

describe('Pruebas de autenticación', () => {
    it('Debe registrar un usuario', async () => {
        const res = await request(app).post('/api/auth/register').send({
            nombre: "Test",
            correo: randomEmail,
            password: "123456",
        });

        console.log("Correo usado en test:", randomEmail);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
    });

    it('Debe iniciar sesión', async () => {
        const res = await request(app).post('/api/auth/login').send({
            correo: randomEmail,
            password: "123456",
        });

        console.log("Respuesta login:", res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        testToken = res.body.token;
    });

    it('Debe acceder a una ruta protegida con un token válido', async () => {
        console.log("Token usado en test:", testToken);

        const res = await request(app)
            .get('/api/protegida')
            .set('Authorization', `Bearer ${testToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Acceso permitido');
    });
});
