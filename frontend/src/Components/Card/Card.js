import React from "react";

const Card = (props) => {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.title}</h5>
				<p className="card-text">{props.description}</p>
				<p className="card-text">
					<small className="text-muted">{props.time} min</small>
					<span className="ActionBtn">
						<button
							onClick={props.click}
							className="fas fa-trash"
							id="fa-trash"
							title="Delete Note"
						></button>
						{/* <button
							onClick={props.Edit}
							className="fas fa-pen"
							id="edit"
							title="Edit Note"
						></button> */}
						<button
							onClick={props.Edit}
							type="button"
							className="fas fa-pen"
							data-toggle="modal"
							id="edit"
							data-target="#exampleModalCenter"
						></button>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Card;
