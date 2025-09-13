"use client"

import Profile from "@components/Profile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        fetchPosts();
    }, [id])
    console.log(posts[0]?.creator.username);
    return (
        <Profile
            name={posts[0]?.creator.username}
            desc={`Welcome to ${posts[0]?.creator.username} personalized profile page. Explore their prompts and ideas`}
            data={posts}
        />
    )
}

export default UserProfile