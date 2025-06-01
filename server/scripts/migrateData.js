require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Article = require('../models/Article');
const Community = require('../models/Community');

async function migrateData() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tree-planting-volunteer');
        console.log('Connected to MongoDB successfully');

        // Update User documents to include empty arrays for new fields
        console.log('Updating User documents...');
        await User.updateMany(
            {},
            {
                $set: {
                    posts: [],
                    articles: [],
                    communities: [],
                    createdCommunities: []
                }
            }
        );

        // Update posts references in User documents
        console.log('Updating post references...');
        const posts = await Post.find();
        for (const post of posts) {
            if (post.author) {
                await User.findByIdAndUpdate(
                    post.author,
                    { $addToSet: { posts: post._id } }
                );
            }
        }

        // Update article references in User documents
        console.log('Updating article references...');
        const articles = await Article.find();
        for (const article of articles) {
            if (article.author) {
                await User.findByIdAndUpdate(
                    article.author,
                    { $addToSet: { articles: article._id } }
                );
            }
        }

        // Update community references
        console.log('Updating community references...');
        const communities = await Community.find();
        for (const community of communities) {
            if (community.creator) {
                await User.findByIdAndUpdate(
                    community.creator,
                    { 
                        $addToSet: { 
                            communities: community._id,
                            createdCommunities: community._id
                        }
                    }
                );
            }
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
}

migrateData(); 