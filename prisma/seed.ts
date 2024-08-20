// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Medical Education"
      }
    }),
    prisma.category.create({
      data: {
        name: "Professional Development"
      }
    }),
    prisma.category.create({
      data: {
        name: "Student Resources"
      }
    }),
    prisma.category.create({
      data: {
        name: "Physician Wellness"
      }
    }),
    prisma.category.create({
      data: {
        name: "Healthcare Technology"
      }
    }),
    prisma.category.create({
      data: {
        name: "Medical Research"
      }
    }),
    prisma.category.create({
      data: {
        name: "Clinical Practice"
      }
    }),
    prisma.category.create({
      data: {
        name: "Public Health"
      }
    })
  ]);

  // Create news
//   await Promise.all([
//     prisma.news.create({
//       data: {
//         title: "Next.js 13 Released",
//         content:
//           "Next.js 13 introduces new features including improved routing and layouts.",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[0].id,
//         href: "/"
//       },
//     }),
//     prisma.news.create({
//       data: {
//         title: "Flutter 3.0 Announced",
//         content: "Flutter 3.0 brings support for macOS and Linux desktop apps.",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[1].id,
//         href: "/"
//       },
//     }),
//     prisma.news.create({
//       data: {
//         title: "Kubernetes 1.24 Released",
//         content:
//           "Kubernetes 1.24 includes improvements in security and scalability.",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[2].id,
//         href: "/"
//       },
//     }),
//     prisma.news.create({
//       data: {
//         title: "TensorFlow 2.8 Launched",
//         content:
//           "TensorFlow 2.8 introduces new APIs for advanced machine learning tasks.",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[3].id,
//         href: "/"
//       },
//     }),
//   ]);

//   // Create resources
//   await Promise.all([
//     prisma.resource.create({
//       data: {
//         title: "MDN Web Docs",
//         description: "Comprehensive documentation for web technologies.",
//         bigDescription: `MDN Web Docs is the definitive resource for developers who want to build for the open web. It provides detailed documentation, tutorials, and references for web technologies including HTML, CSS, JavaScript, and Web APIs.

// MDN's content is created and maintained by a community of developers and technical writers, ensuring that the information is up-to-date and relevant. Key features of MDN Web Docs include:

// 1. Comprehensive guides for beginners and advanced developers
// 2. Detailed API references for web technologies
// 3. Interactive examples to help understand concepts
// 4. Browser compatibility tables for different features
// 5. Regular updates to keep pace with evolving web standards

// Whether you're just starting out in web development or you're an experienced professional, MDN Web Docs is an invaluable resource for learning, reference, and staying current with web technologies.`,
//         url: "https://developer.mozilla.org/",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[0].id,
//       },
//     }),
//     prisma.resource.create({
//       data: {
//         title: "React Native Documentation",
//         description:
//           "Official documentation for building mobile apps with React Native.",
//         bigDescription: `React Native is a popular framework for building native mobile applications using React and JavaScript. The official React Native documentation is a comprehensive resource for developers looking to create cross-platform mobile apps.

// Key aspects of the React Native documentation include:

// 1. Getting Started guides for setting up your development environment
// 2. Core Components and APIs reference
// 3. Platform-specific guidelines for iOS and Android
// 4. Performance optimization techniques
// 5. Integration with native modules
// 6. Testing and debugging strategies

// The documentation caters to both beginners and experienced developers, providing step-by-step tutorials, best practices, and in-depth explanations of React Native concepts. Whether you're building your first mobile app or optimizing an existing one, the React Native documentation is an essential resource for mobile app development.`,
//         url: "https://reactnative.dev/",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[1].id,
//       },
//     }),
//     prisma.resource.create({
//       data: {
//         title: "Docker Documentation",
//         description:
//           "Official documentation for Docker containerization platform.",
//         bigDescription: `Docker is a platform for developing, shipping, and running applications in containers. The official Docker documentation is a comprehensive guide for developers and system administrators looking to leverage containerization in their projects and infrastructure.

// The Docker documentation covers a wide range of topics, including:

// 1. Installation and setup guides for various operating systems
// 2. Docker concepts: images, containers, volumes, and networks
// 3. Dockerfile reference for building custom images
// 4. Docker Compose for defining and running multi-container applications
// 5. Docker Swarm for container orchestration
// 6. Best practices for security and performance
// 7. Integration with continuous integration and deployment pipelines

// Whether you're new to containerization or an experienced DevOps professional, the Docker documentation provides valuable insights into efficiently building, deploying, and managing containerized applications.`,
//         url: "https://docs.docker.com/",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[2].id,
//       },
//     }),
//     prisma.resource.create({
//       data: {
//         title: "Kaggle",
//         description: "Platform for data science competitions and resources.",
//         bigDescription: `Kaggle is a popular platform for data scientists, offering a unique blend of competition, learning, and community. It provides a space for data scientists to showcase their skills, learn from others, and contribute to real-world machine learning projects.

// Key features of Kaggle include:

// 1. Data Science Competitions: Companies and organizations host competitions with real-world datasets, offering prizes for the best solutions.
// 2. Datasets: A vast repository of public datasets that can be used for practice or personal projects.
// 3. Notebooks: Interactive coding environments where users can share their analysis and machine learning models.
// 4. Courses: Free online courses covering various aspects of machine learning and data science.
// 5. Discussion Forums: A place to ask questions, share insights, and connect with other data scientists.
// 6. Kaggle API: Programmatic access to Kaggle's features for automation and integration.

// Whether you're a beginner looking to learn data science or an experienced practitioner wanting to test your skills against the best in the field, Kaggle offers valuable resources and opportunities for growth in the data science community.`,
//         url: "https://www.kaggle.com/",
//         imageUrl:
//           "https://images.unsplash.com/photo-1723397940071-a937054b54e7?q=80&w=1135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         categoryId: categories[3].id,
//       },
//     }),
//   ]);

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
