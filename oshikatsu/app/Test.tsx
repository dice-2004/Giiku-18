import React, { useState } from 'react'

interface FlagProps {
	onclick: (flag: boolean) => void;
}

const Test: React.FC<FlagProps> = ({ onclick}) => {
	const [isClick, setIsClick] = useState(false);

	const click = () => {
		setIsClick(!isClick);
		onclick(!isClick);
	};

	return (
		<button onClick={ click }>
			{isClick? 'ON' : 'OFF'}
		</button>
	);
}
export default Test;
