import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import * as postClient from '../Home/client';
import * as userClient from '../User/client';
import { setUser } from '../User/reducer';
import { ClickableImage } from './clickableImage';
import { useState } from 'react';

const Post = ({ currentPost }: { currentPost: any }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [post, setPost]: [post: any, setPost: any] = useState(currentPost);
    var user = useSelector((state: any) => state.userReducer.user);
    const react = async (add: boolean) => {
        var newPost = {}
        if (add) {
            newPost = { ...post, reactions: [...post.reactions, user._id] }
        } else {
            newPost = { ...post, reactions: post.reactions.filter((userid: any) => userid !== user._id) }
        }
        await postClient.updatePost(post._id, newPost);
        setPost(newPost);
    }

    const follow = async (add: boolean) => {
        await userClient.follow(user._id, post.userid, add);
        var newUser = {}
        if (add === true) {
            newUser = { ...user, following: [...user.following, post.userid] }
        } else {
            newUser = { ...user, following: user.following.filter((userid: any) => userid !== post.userid) }
        }
        dispatch(setUser(newUser));
    }

    const castVote = async (option: any) => {
        const newVotes = { ...post.votes, [user._id]: option };
        const newPost = { ...post, votes: newVotes };
        await postClient.updatePost(post._id, newPost);
        setPost(newPost);
    };

    const deletePost = async () => {
        try {
            await postClient.deletePost(post._id);
            navigate('/');
        } catch (e) {
        }
    }

    return (
        <div className="card my-4 m-md-4">
            <div className="container">
                <div className="row my-1">
                    <div className="col-6">
                        <Link className="nav-link" to={`/profile/${post.userid}`}>
                            <img
                                className="me-2 rounded-circle"
                                src={post.user.image === undefined || post.user.image === '' ? "/default.jpg" : post.user.image}
                                alt="profile-image"
                                style={{ width: "40px", height: "40px", objectFit: 'cover'}}
                            />
                            {post.user.username}
                        </Link>
                    </div>
                    {user._id !== '' && (
                        <div className="col-6 d-flex justify-content-end align-items-center">
                            {user.following.includes(post.userid) ? (
                                <Link
                                    className="nav-link"
                                    onClick={() => follow(false)}
                                    to={''}
                                >
                                    <RiUserFollowFill /> Unfollow
                                </Link>
                            ) : (
                                <Link
                                    className="nav-link"
                                    onClick={() => follow(true)}
                                    to={''}
                                >
                                    <RiUserFollowLine /> Follow
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ClickableImage post={post} />
            <div className="container">
                <div className="row align-items-center my-3">
                    {user._id !== '' ? (
                        <div className="col-6">
                            {post.reactions.includes(user._id) ? (
                                <FaHeart onClick={() => react(false)} />
                            ) : (
                                <FaRegHeart onClick={() => react(true)} />
                            )}
                            {post.reactions.length > 0 && ` ${post.reactions.length} likes`}
                        </div>
                    ) : (
                        <div className="col-6">{` ${post.reactions.length} likes`}</div>
                    )}
                    {user._id === post.userid &&
                        <div className="col-6">
                            <FaTrash className='float-end' onClick={deletePost} />
                        </div>
                    }
                </div>
                <div className="row">
                    {user._id !== '' && (
                        <div className="col-12">
                            {post.votes && user._id in post.votes ? (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6">
                                            {
                                                post.options[1] == post.options[5] && post.votes[user._id] == 1 &&
                                                <button className="btn btn-success w-100 mb-2 disabled">{post.options[1]}</button>
                                            }
                                            {
                                                post.options[1] == post.options[5] && post.votes[user._id] != 1 &&
                                                <button className="btn btn-primary w-100 mb-2 disabled">{post.options[1]}</button>
                                            }
                                            {
                                                post.options[1] != post.options[5] && post.votes[user._id] == 1 &&
                                                <button className="btn btn-danger w-100 mb-2 disabled">{post.options[1]}</button>
                                            }
                                            {
                                                post.options[1] != post.options[5] && post.votes[user._id] != 1 &&
                                                <button className="btn btn-outline-secondary w-100 mb-2 disabled">{post.options[1]}</button>
                                            }
                                        </div>
                                        <div className="col-6">
                                            {
                                                post.options[2] == post.options[5] && post.votes[user._id] == 2 &&
                                                <button className="btn btn-success w-100 mb-2 disabled">{post.options[2]}</button>
                                            }
                                            {
                                                post.options[2] == post.options[5] && post.votes[user._id] != 2 &&
                                                <button className="btn btn-primary w-100 mb-2 disabled">{post.options[2]}</button>
                                            }
                                            {
                                                post.options[2] != post.options[5] && post.votes[user._id] == 2 &&
                                                <button className="btn btn-danger w-100 mb-2 disabled">{post.options[2]}</button>
                                            }
                                            {
                                                post.options[2] != post.options[5] && post.votes[user._id] != 2 &&
                                                <button className="btn btn-outline-secondary w-100 mb-2 disabled">{post.options[2]}</button>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            {
                                                post.options[3] == post.options[5] && post.votes[user._id] == 3 &&
                                                <button className="btn btn-success w-100 mb-2 disabled">{post.options[3]}</button>
                                            }
                                            {
                                                post.options[3] == post.options[5] && post.votes[user._id] != 3 &&
                                                <button className="btn btn-primary w-100 mb-2 disabled">{post.options[3]}</button>
                                            }
                                            {
                                                post.options[3] != post.options[5] && post.votes[user._id] == 3 &&
                                                <button className="btn btn-danger w-100 mb-2 disabled">{post.options[3]}</button>
                                            }
                                            {
                                                post.options[3] != post.options[5] && post.votes[user._id] != 3 &&
                                                <button className="btn btn-outline-secondary w-100 mb-2 disabled">{post.options[3]}</button>
                                            }
                                        </div>
                                        <div className="col-6">
                                            {
                                                post.options[4] == post.options[5] && post.votes[user._id] == 4 &&
                                                <button className="btn btn-success w-100 mb-2 disabled">{post.options[4]}</button>
                                            }
                                            {
                                                post.options[4] == post.options[5] && post.votes[user._id] != 4 &&
                                                <button className="btn btn-primary w-100 mb-2 disabled">{post.options[4]}</button>
                                            }
                                            {
                                                post.options[4] != post.options[5] && post.votes[user._id] == 4 &&
                                                <button className="btn btn-danger w-100 mb-2 disabled">{post.options[4]}</button>
                                            }
                                            {
                                                post.options[4] != post.options[5] && post.votes[user._id] != 4 &&
                                                <button className="btn btn-outline-secondary w-100 mb-2 disabled">{post.options[4]}</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6">
                                            <button
                                                className="btn btn-outline-primary w-100 mb-2"
                                                onClick={() => castVote(1)}
                                            >
                                                {post.options[1]}
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                className="btn btn-outline-primary w-100 mb-2"
                                                onClick={() => castVote(2)}
                                            >
                                                {post.options[2]}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button
                                                className="btn btn-outline-primary w-100 mb-2"
                                                onClick={() => castVote(3)}
                                            >
                                                {post.options[3]}
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                className="btn btn-outline-primary w-100 mb-2"
                                                onClick={() => castVote(4)}
                                            >
                                                {post.options[4]}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Post;
