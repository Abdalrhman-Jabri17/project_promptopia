"use client"
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
import { useRouter, useSearchParams } from "next/navigation"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map(post => {
                return <PromptCard key={post._id} post={post} handleTagClick={() => handleTagClick(post.tag)} />
            })}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleTagClick = (tag) => {
        setSearchText(tag);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const url = searchText ? `/api/prompt?q=${searchText}` : "/api/prompt";
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, [searchText]);
    return (
        <section className="feed">
            <form className="relative w-full flex-center" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    )
}

export default Feed