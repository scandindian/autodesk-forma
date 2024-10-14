export interface IGeometry {
  type: "Polygon";
  coordinates: Array<Array<[number, number]>>;
}

export interface IFeature {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: IGeometry;
}

export interface IFeatureCollection {
  type: "FeatureCollection";
  features: IFeature[];
}

export interface IFileData {
  filename: string;
  data: IFeatureCollection;
}

export interface IPolygonData {
  positions: [number, number][];
  isSelected: boolean;
}
