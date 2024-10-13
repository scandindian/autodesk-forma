export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface IPolygon {
  type: "Polygon";
  coordinates: Array<Array<ICoordinate>>;
}

export interface IGeometry {
  type: "Polygon";
  coordinates: ICoordinate[][];
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
