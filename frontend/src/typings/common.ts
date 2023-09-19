export type Side = 'WHITE' | 'BLACK';

export type Goma = {
  name: string;
  side: Side;
  coordinate: {
    x: number;
    y: number;
    z: number;
  };
};

export type Player = {
  id: string;
  name: string;
  side: Side;
};
