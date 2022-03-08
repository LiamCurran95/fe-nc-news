import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
	const [article, setArticle] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [currentVotes, setVotes] = useState(0);
	const [err, setErr] = useState(null);
	const { article_id } = useParams();

	const handleVote = (value) => {
		setVotes((currentVotes) => currentVotes + value);
		setErr(null);
		api.voteOnArticle(article_id, value).catch((err) => {
			if (value) setVotes((votes) => votes - value);
			setErr("Vote failed, please try again");
		});
	};

	useEffect(() => {
		if (article_id) {
			api.fetchArticleById(article_id).then((data) => {
				setArticle(data);
				setIsLoading(false);
			});
		}
	}, [article_id]);

	if (isLoading) return <p>Loading...</p>;

	const published = article.created_at.toString().slice(0, 10);

	return (
		<main className="container">
			<div className="singleArticle">
				<h1 className="article_title">{article.title}</h1>
				<h2 className="article_author">{article.author}</h2>
				<h3 className="article_topic">{article.topic}</h3>
				<p className="article_created_at">{published}</p>
				<p className="article_votes">{article.votes + currentVotes}</p>
				<p className="article_comment_count">{article.comment_count}</p>
				<button
					onClick={() => {
						handleVote(1);
					}}
				>
					Upvote Article <i className="arrow up"></i>
				</button>
				{err ? <p>{err}</p> : null}
				<button
					onClick={() => {
						handleVote(-1);
					}}
				>
					Downvote Article <i className="arrow down"></i>
				</button>
			</div>
		</main>
	);
};

export default SingleArticle;