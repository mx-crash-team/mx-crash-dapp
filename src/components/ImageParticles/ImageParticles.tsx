import classNames from 'classnames';
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
} from 'react-particle-image';
import { WithClassnameType } from 'types';

const round = (n: number, step = 20) => Math.ceil(n / step) * step;

const STEP = 20;

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);

    return pixel.r > 50 || pixel.g > 50 || pixel.b > 50;
  },
  color: ({ x, y, image }) => {
    const pixel = image.get(x, y);

    return `rgba(
      ${round(pixel.r, STEP)}, 
      ${round(pixel.g, STEP)}, 
      ${round(pixel.b, STEP)}, 
      ${round(pixel.a, STEP) / 255}
    )`;
  },
  radius: () => Math.random() * 1 + 0.5,
  mass: () => 20,
  friction: () => 0.55,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

export interface ImageParticlesUIType extends WithClassnameType {
  image?: string;
}

export const ImageParticles = ({
  image = '/projects/particles/x.png',
  className
}: ImageParticlesUIType) => {
  return (
    <div className={classNames('particle-wrapper', className)}>
      <ParticleImage
        src={image}
        scale={0.8}
        entropy={20}
        maxParticles={3000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        backgroundColor='transparent'
        className='particles-foreground'
      />
    </div>
  );
};
