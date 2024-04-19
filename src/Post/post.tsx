import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import * as postClient from '../Home/client';
import { updatePost } from '../Home/reducer';
import * as userClient from '../User/client';
import { setUser } from '../User/reducer';

const Post = ({ post }: { post: any }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userReducer.user);
    const react = async (add: boolean) => {
        var newPost = {}
        if (add) {
            newPost = { ...post, reactions: [...post.reactions, user._id] }
        } else {
            newPost = { ...post, reactions: post.reactions.filter((userid: any) => userid != user._id) }
        }
        await postClient.updatePost(post._id, newPost);
        dispatch(updatePost(newPost));
    }

    const follow = async (add: boolean) => {
        var newUser = {}
        if (add) {
            newUser = { ...user, following: [...user.following, post.userid] }
        } else {
            newUser = { ...user, following: user.following.filter((userid: any) => userid != post.userid) }
        }
        console.log(newUser)
        await userClient.updateUser(newUser);
        dispatch(setUser(newUser));
    }

    const castVote = async (option: any) => {
        const newVotes = { ...post.votes, [user._id]: option };
        const newPost = { ...post, votes: newVotes };
        await postClient.updatePost(post._id, newPost);
        dispatch(updatePost(newPost));
    };

    return (
        <div className='card m-4 shadow-lg'>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Link className='nav-link' to={`/profile/${post.userid}`}>{post.userid}</Link>

                    </div>
                    <div className="col-6">
                        {user._id != '' && user.following.includes(post.userid) ?
                            (<Link className='nav-link float-end' onClick={() => follow(false)} to={''}><RiUserFollowFill />Unfollow</Link>) :
                            (<Link className='nav-link float-end' onClick={() => follow(true)} to={''}><RiUserFollowLine />Follow</Link>)
                        }
                    </div>
                </div>
            </div>

            <img src={`${post.image}`} alt="image" />

            <div className="container">
                <div className="row">
                    {user._id != '' ? <div>
                        {post.reactions.includes(user._id) ? (<FaHeart onClick={() => react(false)} />) : (<FaRegHeart onClick={() => react(true)} />)}
                        {post.reactions.length > 0 && (' ' + post.reactions[0] + ', and ' + (post.reactions.length - 1) + ' more')}
                    </div> :
                        <div>
                            {post.reactions.length > 0 && (' ' + post.reactions[0] + ', and ' + (post.reactions.length - 1) + ' more')}
                        </div>}
                </div>
                <div className="row">
                    {user._id != '' && (
                        <div>
                            {post.votes && user._id in post.votes ? (<div className="container m-0 p-0">
                                {`Voted - ${post.options[post.votes[user._id]]}`}<br/>
                                {`Answer - ${post.options[1]}`}
                            </div>) : (<div className="container">
                                <div className="row">
                                    <button className='col-6' onClick={() => castVote(1)}>{post.options[1]}</button>
                                    <button className='col-6' onClick={() => castVote(2)}>{post.options[2]}</button>
                                </div>

                                <div className="row">
                                    <button className='col-6' onClick={() => castVote(3)}>{post.options[3]}</button>
                                    <button className='col-6' onClick={() => castVote(4)}>{post.options[4]}</button>
                                </div>
                            </div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Post;
