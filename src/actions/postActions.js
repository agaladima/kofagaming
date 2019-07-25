import {FETCH_POSTS, NEW_POSTS} from './types';

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => dispatch({
      type: FETCH_POSTS,
      payload: json
    }));
};

export const createPost = postData => dispatch => {
  console.log('action called');
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(res => res.json())
  .then(post => dispatch({
    type: NEW_POSTS,
    payload: post
  }));
}
