import {useVideoConfig, Sequence, interpolate, useCurrentFrame} from 'remotion';
import React from 'react';

export const Text: React.FC<{
	text: string;
}> = ({text}) => {
	const frame = useCurrentFrame();
	const fadeIn = interpolate(frame, [0, 20], [0, 1]);

	const style = {
		opacity: fadeIn,
	};
	return (
		<div
			className="text-6xl p-12  text-white bg-zinc-800 bg-opacity-60 rounded-xl font-bold leading-relaxed z-[999]"
			style={style}
		>
			<p className="">{text}</p>
		</div>
	);
};

export const TextSequence: React.FC<{lines: string[]}> = ({lines}) => {
	const {durationInFrames, fps} = useVideoConfig();

	return (
		<div className="grid m-12 gap-12 grid-rows-3 items-center">
			{lines.map((text, i) => {
				return (
					<Sequence
						name={`text-${i}`}
						durationInFrames={
							(durationInFrames / lines.length) * (lines.length - i)
						}
						from={
							i === lines.length - 1
								? durationInFrames - 1.5 * fps
								: (durationInFrames / lines.length) * i
						}
						layout="none"
					>
						<Text text={text} />
					</Sequence>
				);
			})}
		</div>
	);
};
