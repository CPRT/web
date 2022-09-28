cd /cprt-ros-web
npm install
# web
Web interface for monitoring rover systems and issuing commands

> Note: Before launching the docker-compose stack, modify the websocket address in `cprt-ros-web/src/App.js` to localhost.

# ROS setup

To connect a local instance of ROS you must first install Rosbridge onto your ROS instance;

```
sudo apt-get install ros-<rosdistro>-rosbridge-suite
```

After installation you must setup your environment for ROS and rosbridge;

```
source /opt/ros/<rosdistro>/setup.bash
```

Finally all that is needed is to launch rosbridge;

```
roslaunch rosbridge_server rosbridge_websocket.launch
```

> Note: `<rosdistro>` is the ROS installation distribution that you are currently using, for example `noetic`
