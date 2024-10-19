# Waiter-Mate

Waiter-Mate é um aplicativo desenvolvido para auxiliar garçons no atendimento ao cliente, facilitando a criação de pedidos, visualização do cardápio, e envio desses pedidos para a cozinha. O app utiliza o Firebase como banco de dados para armazenar informações sobre os pratos e pedidos, e a UI Kitten como biblioteca de componentes para uma interface de usuário elegante e responsiva. Além disso, o projeto é gerenciado pelo Expo, que simplifica o processo de desenvolvimento e teste em diferentes plataformas.

## Configuração Inicial

Para começar a utilizar o Waiter-Mate, siga os passos abaixo:

1. Clone o repositório para sua máquina local.
2. Abra o terminal e navegue até a pasta do projeto.
3. Execute o comando `npm install` para instalar todas as dependências necessárias.

### Ajuste Importante

Antes de iniciar o app, é necessário atualizar o caminho de importação do App no arquivo [`node_modules/expo/AppEntry.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FGabriel%2FDocuments%2FTopicos%20especiais%20Eng%20Soft%2FWaiter-Mate%2Fnode_modules%2Fexpo%2FAppEntry.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\Gabriel\Documents\Topicos especiais Eng Soft\Waiter-Mate\node_modules\expo\AppEntry.js"). Altere de:

```javascript
'../../App'
```

Para:

```javascript
'../../src/App'
```

Isso é necessário para que o Expo consiga encontrar e executar o arquivo principal do aplicativo corretamente.

## Executando o Aplicativo

Com todas as dependências instaladas e o ajuste feito, você pode iniciar o aplicativo executando `expo start` no terminal. Isso abrirá uma nova janela no seu navegador com opções para executar o aplicativo em emuladores ou no seu dispositivo via QR Code.

## Usuários para Teste

Para facilitar os testes, o aplicativo já vem com usuários pré-configurados:

### Usuário Comum (Login)

- Email: test@test.com
- Senha: 123456

### Usuário Garçom

- Email: roger@gmail.com
- Senha: 123456

### Usuário Gerente

- Email: bruno@gmail.com
- Senha: 123456

Com esses usuários, você pode testar todas as funcionalidades do aplicativo, desde a visualização do cardápio até o envio de pedidos para a cozinha.

## Tecnologias Utilizadas

- **Firebase:** Banco de dados para armazenamento de informações sobre pratos e pedidos.
- **UI Kitten:** Biblioteca de componentes para React Native, proporcionando uma interface de usuário elegante e responsiva.
- **Expo:** Plataforma de código aberto para facilitar o desenvolvimento e teste de aplicativos em React Native.

Esperamos que o Waiter-Mate torne o atendimento em seu estabelecimento mais eficiente e agradável!