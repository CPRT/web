import ROSLIB from 'roslib';
declare module 'ros';

interface Header {
  seq: number;
  stamp: number;
  frame_id: string;
}

interface NavSatStatus {
  status: number;
  service: number;
}

interface NavSatFix extends ROSLIB.Message {
  header: Header;
  status: NavSatStatus;
  latitude: number;
  longitude: number;
  altitude: number;
  position_covariance: number[9];
  position_covariance_type: number;
}

interface Imu extends ROSLIB.Message {
  header: Header;

  orientation: ROSLIB.Quaternion;
  orientation_covariance: number[9];

  angular_velocity: ROSLIB.Vector3;
  angular_velocity_covariance: number[9];

  linear_acceleration: ROSLIB.Vector3;
  linear_acceleration_covariance: number[9];
}

interface Twist extends ROSLIB.Message {
  linear: ROSLIB.Vector3;
  angular: ROSLIB.Vector3;
}
