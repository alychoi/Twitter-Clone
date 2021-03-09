import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import db from "./firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  console.log(setPosts);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <div className="generate__header">
        <center><h2 style={{fontSize:"20px",fontWeight:"800",paddingBottom:"15px"}}>Let's Go!</h2>
        <p style={{color:"gray"}}>Click on the button below to create AI-generated text.</p>
        <Button
          //onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >Generate</Button></center>
      </div>

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
