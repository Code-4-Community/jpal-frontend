import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Post from '../models/Post';

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => (
  <VStack spacing={4}>
    {posts.map((post: Post) => (
      <Box borderWidth="1px" borderRadius="lg" padding={2} width="100%">
        <Text fontSize="xl" fontWeight="semibold">
          {post.title}
        </Text>
        <Text>{post.body}</Text>
      </Box>
    ))}
  </VStack>
);

export default PostsList;
