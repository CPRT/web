declare module "roslib";

export declare namespace ROSLIB {
  interface Header {
    seq: number;
    stamp: number;
    frame_id: string;
  }

  interface NavSatStatus {
    status: number;
    service: number;
  }

  interface NavSatFix {
    header: Header;
    status: NavSatStatus;
    latitude: number;
    longitude: number;
    altitude: number;
    position_covariance: number[9];
    position_covariance_type: number;
  }
}
