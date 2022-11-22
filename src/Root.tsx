import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	const fps = 60;
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={15 * fps}
				fps={fps}
				width={1080}
				height={1920}
			/>
		</>
	);
};
