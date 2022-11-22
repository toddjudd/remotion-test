import React from 'react';
import {
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from 'remotion';

export const Photo: React.FC<{
	src: string;
	fadeDurrationInFrames: number;
	direction: number;
	isStatic?: boolean;
}> = ({src, fadeDurrationInFrames, direction, isStatic}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const [xDirection, yDirection] = [
		[-1, 1],
		[-1, -1],
		[1, 1],
		[1, -1],
	][direction % 4];

	const fadeOut = interpolate(
		frame,
		[durationInFrames - fadeDurrationInFrames, durationInFrames],
		[1, 0]
	);

	const max = 150;
	const scale = interpolate(frame, [0, durationInFrames], [max / 100, 1]);
	const translate = interpolate(
		frame,
		[0, durationInFrames],
		[(max - 100) / 2, 0]
	);
	const style = {
		display: 'absolute',
		width: '100%',
		height: '100%',
		transform: isStatic
			? `translate(${((max - 100) / 2) * xDirection}%, ${
					((max - 100) / 2) * yDirection
			  }%) Scale(${max / 100})`
			: `translate(${translate * xDirection}%, ${
					translate * yDirection
			  }%) Scale(${scale})`,
		opacity: fadeOut,
	};

	return (
		<div className="h-full w-full relative">
			<Img
				src={staticFile(src)}
				alt="faePortal"
				className="object-cover"
				style={style}
			/>
		</div>
	);
};
