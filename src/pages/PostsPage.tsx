import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Container,
  Heading,
  HStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import apiClient from '../api/apiClient';
import CreatePostForm from '../components/CreatePostForm';
import PostsList from '../components/PostsList';
import Post, { CreatePostRequest } from '../models/Post';

const PostsPage: React.FC = () => {
  const { isLoading, error, data } = useQuery<Post[], Error>('posts', () => apiClient.getPosts());
  const mutation = useMutation((newPost: CreatePostRequest) => apiClient.createPost(newPost));
  const toast = useToast();
  return (
    <Container maxWidth="4xl">
      <Heading paddingBottom={4}>Hello from the Post Page!</Heading>

      <HStack align="left">
        <Box width="50%">
          {data && <PostsList posts={data} />}
          {isLoading && <Spinner size="xl" />}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Posts could not be loaded!</AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          )}
        </Box>
        <Box width="50%">
          <CreatePostForm
            onSubmit={async (newPost: CreatePostRequest) => {
              try {
                await mutation.mutateAsync(newPost);
                toast({
                  title: 'Post created.',
                  description: `Your post ${newPost.title} has been successfully created.`,
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                });
              } catch (err) {
                toast({
                  title: 'Failure creating post.',
                  description: `There was an error creating your post.`,
                  status: 'error',
                  duration: 4000,
                  isClosable: true,
                });
              }
            }}
          />
        </Box>
      </HStack>
    </Container>
  );
};

export default PostsPage;
