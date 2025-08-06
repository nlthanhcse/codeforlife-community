# Code for Life Community 🌐

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/nlthanhcse/codeforlife-community-be">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Code for Life Community</h3>

  <p align="center">
    A modern, scalable social platform for tech enthusiasts to share knowledge and connect globally
    <br />
    <a href="https://github.com/nlthanhcse/codeforlife-community-be/tree/main/docs"><strong>📚 Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nlthanhcse/codeforlife-community-be">🎬 View Demo</a>
    ·
    <a href="https://github.com/nlthanhcse/codeforlife-community-be/issues/new?labels=bug&template=bug-report---.md">🐛 Report Bug</a>
    ·
    <a href="https://github.com/nlthanhcse/codeforlife-community-be/issues/new?labels=enhancement&template=feature-request---.md">💡 Request Feature</a>
  </p>
</div>

---

## 🚀 About The Project

**Code for Life Community** is a comprehensive social platform designed specifically for tech enthusiasts, developers, and knowledge seekers. Built with modern microservices architecture, this platform enables users to share coding experiences, best practices, creative ideas, and connect with like-minded individuals worldwide.

### ✨ Key Features

- 🎯 **Knowledge Sharing**: Post and discuss tech topics, code snippets, and best practices
- 👥 **Smart Networking**: Advanced contributor ranking system to discover talented developers
- 🔒 **Secure & Scalable**: JWT authentication, role-based access control, and microservices architecture
- 📱 **Modern UI**: Responsive Angular frontend with PrimeNG components
- 🌐 **Real-time Features**: Live notifications and updates
- 📊 **Community Insights**: Contributor analytics and engagement metrics

### 🎯 Project Vision

> "A platform where tech enthusiasts can exchange knowledge, share innovative ideas, and build meaningful connections across the global developer community."

## 🏗️ Architecture Overview

This project follows a **microservices architecture** with modern DevOps practices:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular 19    │    │  Spring Gateway │    │  Eureka Server  │
│   Frontend      │◄──►│   Service       │◄──►│   Discovery     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
            ┌───────▼──┐ ┌──────▼──┐ ┌──────▼──┐
            │   Auth   │ │  User   │ │  Post   │
            │ Service  │ │Service  │ │Service  │
            └──────────┘ └─────────┘ └─────────┘
                    │           │           │
                    └───────────┼───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Notification       │
                    │     Service          │
                    └─────────────────────┘
```

## 🛠️ Technology Stack

### Backend Services
- **Framework**: Spring Boot 3.4.5 with Java 22
- **Architecture**: Microservices with Spring Cloud Gateway
- **Service Discovery**: Netflix Eureka
- **Security**: JWT Authentication + Role-based Authorization
- **Database**: MySQL 8.0+ with JPA/Hibernate
- **Caching**: Redis for session management
- **Message Broker**: Apache Kafka (planned)
- **Documentation**: OpenAPI 3.0 (Swagger)

### Frontend
- **Framework**: Angular 19.1.3
- **UI Library**: PrimeNG 19.0.5 with PrimeFlex
- **State Management**: NgRx 19.0.0
- **Real-time**: WebSocket with STOMP
- **Styling**: CSS with PrimeNG themes
- **Code Editor**: Quill.js with Highlight.js

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (planned)
- **Monitoring**: Prometheus, Grafana, Jaeger
- **Logging**: Centralized logging with Dozzle
- **Storage**: MinIO for file management
- **CI/CD**: GitHub Actions
- **Cloud**: AWS deployment (planned)

## 🚦 Getting Started

### Prerequisites

- **Java**: JDK 22+
- **Node.js**: 18.x+
- **Docker**: Latest version
- **Docker Compose**: Latest version
- **Git**: Latest version

### 🔧 Quick Start (Docker - Recommended)

1. **Clone the repositories**
   ```bash
   git clone https://github.com/nlthanhcse/codeforlife-community-be.git
   git clone https://github.com/nlthanhcse/codeforlife-community-fe.git
   ```

2. **Start the backend services**
   ```bash
   cd codeforlife-community-be
   docker-compose -f docker-compose-local.yml up -d
   ```

3. **Start the frontend**
   ```bash
   cd codeforlife-community-fe
   docker-compose -f docker-compose-local.yml up -d
   ```

4. **Access the application**
    - **Frontend**: http://localhost:4200
    - **API Gateway**: http://localhost:8080
    - **Eureka Dashboard**: http://localhost:8761
    - **Swagger UI**: http://localhost:8080/swagger-ui.html

### 🛠️ Development Setup

<details>
<summary>Click to expand development setup instructions</summary>

#### Backend Development
```bash
cd codeforlife-community-be
mvn clean install
mvn spring-boot:run -pl eureka-service
mvn spring-boot:run -pl gateway-service
mvn spring-boot:run -pl auth-service
mvn spring-boot:run -pl user-service
mvn spring-boot:run -pl post-service
mvn spring-boot:run -pl notification-service
```

#### Frontend Development
```bash
cd codeforlife-community-fe
npm install
ng serve
```

</details>

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [🏗️ Architecture Guide](docs/ARCHITECTURE.md) | System design and microservices architecture |
| [🔌 API Documentation](docs/API.md) | Complete REST API reference |
| [🗄️ Database Schema](docs/DATABASE.md) | Database design and relationships |
| [🚀 Deployment Guide](docs/DEPLOYMENT.md) | Multi-environment deployment |
| [📊 Monitoring Setup](docs/MONITORING.md) | Observability and monitoring |
| [🤝 Contributing Guide](docs/CONTRIBUTING.md) | How to contribute to the project |
| [🗺️ Project Roadmap](docs/ROADMAP.md) | Future plans and features |

## 🌟 Key Features Deep Dive

### 🎯 Smart Contributor Ranking
- **Top Contributors**: Comprehensive scoring algorithm
- **Rising Stars**: New talent discovery
- **Community Leaders**: Established influencers
- **Active Contributors**: Most engaged members

### 🔒 Security & Authentication
- JWT-based authentication
- Role-based access control (USER, ADMIN, TECHNICAL)
- Password encryption with BCrypt
- Request validation and sanitization

### 📊 Real-time Features
- Live notifications
- WebSocket connections
- Real-time updates
- Event-driven architecture

## 🗺️ Roadmap

### 🚀 Phase 1 (Current)
- [x] Microservices architecture
- [x] User management system
- [x] Post creation and management
- [x] Advanced contributor ranking
- [x] Real-time notifications

### 🎯 Phase 2 (Q2 2025)
- [ ] **Chat System**: Real-time messaging
- [ ] **Search Engine**: Full-text search with Elasticsearch
- [ ] **OAuth Integration**: Google/GitHub/LinkedIn login
- [ ] **Dark Mode**: Theme customization
- [ ] **Internationalization**: Multi-language support

### 🌐 Phase 3 (Q3 2025)
- [ ] **Cloud Migration**: AWS deployment
- [ ] **Performance Optimization**: Load testing and optimization
- [ ] **Admin Dashboard**: Community management tools
- [ ] **Mobile App**: React Native implementation
- [ ] **Analytics**: Advanced user behavior tracking

## 📊 Current Status

- **Development Stage**: MVP Ready
- **Test Coverage**: 85%+ (planned)
- **Performance**: Response time < 200ms (local)
- **Security**: JWT + RBAC implemented
- **Scalability**: Kubernetes-ready architecture

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 💡 Ways to Contribute
- **Code**: Bug fixes, new features, performance improvements
- **Documentation**: Technical writing, tutorials, examples
- **Testing**: Unit tests, integration tests, user testing
- **Ideas**: Feature suggestions, architecture improvements
- **Community**: Help other users, answer questions

### 📋 Contribution Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## 🏆 Community & Support

### 💬 Get Help
- **Issues**: [GitHub Issues](https://github.com/nlthanhcse/codeforlife-community-be/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nlthanhcse/codeforlife-community-be/discussions)
- **Email**: nlthanhititiu17038@gmail.com

### 🌟 Show Your Support
- ⭐ Star the project
- 🍴 Fork and contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with others

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nguyen Lam Thanh** - *Full Stack Developer & Community Builder*

- 📧 Email: nlthanhititiu17038@gmail.com
- 💼 LinkedIn: [@nlthanhcse](https://linkedin.com/in/nlthanhcse)
- 🐱 GitHub: [@nlthanhcse](https://github.com/nlthanhcse)

## 🙏 Acknowledgments

Special thanks to:
- [Spring Boot Team](https://spring.io/) for the amazing framework
- [Angular Team](https://angular.io/) for the modern frontend framework
- [PrimeNG](https://primeng.org/) for the beautiful UI components
- [Docker](https://docker.com/) for containerization
- [Open Source Community](https://github.com/) for inspiration and tools

---

<div align="center">
  <strong>Built with ❤️ for the global developer community</strong>
  <br>
  <em>Code for Life • Share • Learn • Connect</em>
</div>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/nlthanhcse/codeforlife-community-be.svg?style=for-the-badge
[contributors-url]: https://github.com/nlthanhcse/codeforlife-community-be/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nlthanhcse/codeforlife-community-be.svg?style=for-the-badge
[forks-url]: https://github.com/nlthanhcse/codeforlife-community-be/network/members
[stars-shield]: https://img.shields.io/github/stars/nlthanhcse/codeforlife-community-be.svg?style=for-the-badge
[stars-url]: https://github.com/nlthanhcse/codeforlife-community-be/stargazers
[issues-shield]: https://img.shields.io/github/issues/nlthanhcse/codeforlife-community-be.svg?style=for-the-badge
[issues-url]: https://github.com/nlthanhcse/codeforlife-community-be/issues
[license-shield]: https://img.shields.io/github/license/nlthanhcse/codeforlife-community-be.svg?style=for-the-badge
[license-url]: https://github.com/nlthanhcse/codeforlife-community-be/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nlthanhcse
