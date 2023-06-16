import "./AlertMsg.css";

export default function AlertMsg({message, type}) {
	return(
		<span className={`alertMsg ${type}`}>
			{message}
		</span>
	)
}