# Gargantua Launcher

Gargantua Launcher é um launcher para Minecraft construído em Rust (backend nativo) e Tauri (integração desktop multiplataforma) com interface web leve usando Vite + Vanilla JS.

**Objetivo:** fornecer um launcher rápido, seguro e extensível que aproveite a performance e segurança do Rust combinado com a ergonomia de interfaces web entregues via Tauri.

**Principais características**
- Inicialização e gerenciamento de instâncias de Minecraft
- Integração nativa com o sistema via Tauri (arquivos, permissões, notificações)
- UI leve baseada em HTML/CSS/JS (Vite)
- Foco em segurança e privacidade (veja [SECURITY.md](SECURITY.md))

**Tecnologias**
- Frontend: Vite + Vanilla JavaScript + CSS
- Backend / integrações nativas: Rust
- Embalagem desktop: Tauri

**Licença**
Este projeto é disponibilizado sob a licença Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0) — uso não-comercial permitido, atribuição e compartilhamento sob a mesma licença obrigatórios. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

Nota: esta licença restringe o uso comercial. Se você precisa de uso comercial, entre em contato com os mantenedores.

---

**Como construir (guia rápido)**

Requisitos básicos
- Node.js (recomenda-se 16+)
- Rust toolchain (rustc, cargo)
- Dependências adicionais do sistema para Tauri (veja a documentação do Tauri para Linux/macOS/Windows)

Passos de build

1) Instalar dependências do frontend

```bash
npm install
```

2) Build do frontend (produção)

```bash
npm run build
```

3) Build da aplicação Tauri (nativo)

Opção simples (constrói o binário usando o `src-tauri`):

```bash
cargo build --release --manifest-path src-tauri/Cargo.toml
```

Ou, se o projeto estiver configurado via scripts npm/tauri, geralmente:

```bash
npm run tauri build
```

Após o build de produção, o artefato (instalador/binário) aparecerá na pasta `src-tauri/target` ou no caminho configurado pelo Tauri.

**Executar em modo desenvolvimento**

1) Rodar o servidor de desenvolvimento do frontend

```bash
npm run dev
```

2) Em outro terminal, rodar o back-end Tauri (modo dev)

```bash
cargo tauri dev --manifest-path src-tauri/Cargo.toml
```

(Se `cargo-tauri` não estiver instalado, use `cargo install tauri-cli` ou rode via `npm run tauri dev` se o script existir.)

**Contribuindo**
- Abra issues para bugs e feature-requests.
- Para código, envie pull requests com descrições claras e testes quando possível.

**Segurança**
- Relate problemas de segurança seguindo as orientações em [SECURITY.md](SECURITY.md).

**Contato / Creditos**
- Projeto: Gargantua Launcher
- Código-fonte: este repositório

---

Se quiser, posso enriquecer este README com badges, screenshots e instruções de empacotamento para plataformas específicas — quer que eu adicione isso agora?

