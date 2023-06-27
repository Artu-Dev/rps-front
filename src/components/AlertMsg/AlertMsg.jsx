import "./AlertMsg.css";

export default function AlertMsg({message, type, time = 3}) {
	return(
		<div className={`alertMsg ${type}`} style={{
			animation: `fadeout ${time}s ease-in forwards`
		}}>
			<div className="alertMsg-textContainer">
				{message}
			</div>
		</div>
	)
}
