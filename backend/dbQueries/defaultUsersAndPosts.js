require('dotenv').config({ path: '../.env' });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug
const { PrismaClient } = require('../generated/prisma')




const prisma = new PrismaClient();

// Define a set of unique titles and corresponding content for the posts
const uniquePosts = [
  {
    title: "The Future of Artificial Intelligence in Healthcare",
    content: "Artificial Intelligence (AI) is revolutionizing the healthcare industry. From improving diagnostic accuracy to personalizing treatment plans, AI holds immense potential in healthcare. In the future, AI could predict diseases before they manifest, allowing for earlier intervention and better patient outcomes."
  },
  {
    title: "The Role of Quantum Computing in Cybersecurity",
    content: "Quantum computing is expected to disrupt the field of cybersecurity by solving problems that traditional computers cannot. With quantum encryption techniques, data could be made virtually unhackable. However, quantum computers also pose a threat to current encryption methods, creating both challenges and opportunities in the security landscape."
  },
  {
    title: "Blockchain and the Future of Digital Currency",
    content: "Blockchain technology is the backbone of digital currencies like Bitcoin and Ethereum. Its decentralized nature allows for secure, transparent transactions without the need for intermediaries. As blockchain adoption grows, we may see new applications in various sectors, including supply chains, healthcare, and voting systems."
  },
  {
    title: "The Impact of 5G on the Internet of Things (IoT)",
    content: "The rollout of 5G networks will significantly accelerate the growth of the Internet of Things (IoT). With faster speeds, lower latency, and higher connectivity, 5G will enable more devices to connect and communicate in real-time. From smart cities to autonomous vehicles, 5G will empower IoT to reach its full potential."
  },
  {
    title: "How Augmented Reality is Changing the Retail Industry",
    content: "Augmented Reality (AR) is transforming the retail experience by allowing consumers to try products virtually before purchasing. From trying on clothes in virtual fitting rooms to visualizing furniture in their homes, AR is enhancing customer experiences and reshaping how brands engage with shoppers."
  },
  {
    title: "The Evolution of Web Development: From Static to Dynamic",
    content: "Web development has evolved significantly over the years. What started as basic HTML websites has now turned into dynamic web applications powered by JavaScript frameworks like React and Angular. The future of web development lies in Progressive Web Apps (PWAs) and serverless architectures, making the web experience faster and more responsive."
  },
  {
    title: "The Rise of Edge Computing and Its Impact on Data Processing",
    content: "Edge computing brings data processing closer to the source of data, reducing latency and bandwidth usage. By processing data locally on devices, edge computing enables real-time decision-making in applications like autonomous vehicles, smart cities, and industrial IoT, where speed and reliability are critical."
  },
  {
    title: "Machine Learning and the Future of Personalized Recommendations",
    content: "Machine Learning (ML) algorithms are becoming increasingly sophisticated in providing personalized recommendations. Whether it's Netflix suggesting a movie or Amazon recommending a product, ML algorithms analyze vast amounts of user data to predict preferences and enhance user experiences."
  },
  {
    title: "The Growing Role of Data Privacy in the Digital Age",
    content: "As more personal information is shared online, data privacy has become a major concern. With regulations like GDPR in place, companies are forced to adopt better security practices to protect users' sensitive information. In the future, data privacy will continue to be a top priority as we become more connected and digitized."
  },
  {
    title: "How the Cloud is Shaping the Future of Business",
    content: "Cloud computing has enabled businesses to scale rapidly without the need for significant upfront investment in infrastructure. From SaaS applications to cloud storage, the cloud is reshaping how companies operate. The future of business will rely heavily on cloud technologies for collaboration, data storage, and software delivery."
  },
];

// Create the posts in the database
async function main() {
  for (let i = 0; i < uniquePosts.length; i++) {
    const { title, content } = uniquePosts[i];

    // Create each post with a unique title and content
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: true,
        authorId: 1, // Author with id 1
        publishedAt: new Date(),
        createdAt: new Date(),
      },
    });

    console.log(`Created post with title: "${title}"`);
  }

  console.log('Created all posts successfully.');
}

// Main function execution
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
