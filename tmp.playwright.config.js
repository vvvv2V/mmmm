/**
 * Config temporária para rodar apenas os E2E em ./e2e/tests
 * Usada para isolar os testes do backend e evitar carregar testes Jest.
 */
module.exports = {
  testDir: './backend/e2e/tests',
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'api',
      use: {}
    }
  ],
  // Não iniciar webServer automaticamente aqui; assume que o servidor já está em execução.
};
