import {useVideoConfig} from 'remotion';
import {AbsoluteFill, Sequence, Audio, staticFile} from 'remotion';
import {Photo} from './Photo';
import {TextSequence} from './Text';

export const MyComposition = () => {
	const {durationInFrames, fps} = useVideoConfig();
	const fadeDurrationInFrames = 15;
	const photos = ['fae.png', 'Fae_Portal.png', 'werewolf.png'];
	const lines = [
		"You've been kidnapped to Faery, and a wolf shifter just killed your captor.",
		"But you're not interested in being saved. You point to the portal.",
		'"Open it, wolf boy."',
	];

	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<Audio src={staticFile('portal.mp3')} startFrom={40 * fps} />
			<TextSequence lines={lines} />
			{photos.map((photo, index) => {
				return (
					<Sequence
						from={
							index * (durationInFrames / photos.length) - fadeDurrationInFrames
						}
						durationInFrames={
							durationInFrames / photos.length + fadeDurrationInFrames
						}
						name={photo}
						style={{zIndex: 0.5 * index + 10 * photos.length}}
					>
						<Photo
							src={photo}
							fadeDurrationInFrames={fadeDurrationInFrames}
							direction={index % 4}
						/>
					</Sequence>
				);
			})}
			<Sequence
				from={durationInFrames - fadeDurrationInFrames}
				durationInFrames={fadeDurrationInFrames}
				name="loop"
				style={{zIndex: 0.5 * photos.length + 10 * photos.length}}
			>
				<Photo
					isStatic
					src={photos[0]}
					fadeDurrationInFrames={1}
					direction={0}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};
