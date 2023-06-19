# WebGL-Project
This report presents a web-based project in which we created a 3D model of a frog
skeleton using Blender, implemented movements on the model using WebGL, and
applied shaders to enhance the visual appeal of the model using Three.js.
The report outlines the various stages involved in the development of the project,
including the creation of the model using Blender, exporting the model to a web-friendly
format, implementing the movements on the model using WebGL, and applying the
shaders to enhance the visual appearance of the model using Three.js.
The report also provides a detailed description of the various components used in the
project, such as Three.js, WebGL, and Blender, along with their functionalities and how
they were used to achieve the desired outcome.
Running the WebGL Project:
1. Install Nodejs LTS version from https://nodejs.org/en/download on your PC.
2. Run command “npm install” to install the packages.
3. Run command “npx vite” to run a localhost server.(generally on
http://localhost:5173/ )
4. Open the URL provided in a web browser like Google Chrome.
## Model :
The making of the frog skeleton and the rigging of the skeleton was done on Blender.
The frog skeleton was made using multiple cube and planar meshes for every bone. The
conventional methodology of using 3 orthogonal angles of the skeleton images to
model to make the skeleton. Unlike the models used in the game project, the skeleton of
the frog was more detailed and hence was more complicated to make. The model we
have made took a lot of time to make because of the irregular shape of the bones.We
tried circumventing this issue by the above mentioned method of using 3 orthogonal
angles of the skeleton images to understand the exact details of each bone. Having 3separate angles of each bone also allowed to make the skeleton faster and more
efficiently. We also made a mirrored model, so only half of the skeleton was needed to
be actually made. While the model is detailed in the sense that every bone has been
made separately with an individual mesh, a drawback of the model is the low amount of
vertices and polygons in each bone, which made the model low-poly. This could have
been avoided, but due to time constraints, we decided against making each bone with a
higher polygon mesh.
The rigging of the skeleton was done on Blender using the armature bones. The rigging
of the model was done using the symmetrize method, again requiring only manual
rigging of one half of the model. Inverse Kinematics was also implemented, making it
easy to animate the model in WebGL. One important feature of the rig is that each
armature bone follows an hierarchy in the entire hierarchy, allowing each armature to
function as actual bones connected by joints instead of individual bones. Constraints
were added on some vital bones to prevent wanton movement and simulate the
movement of an actual bone.
## Movements of the skeleton :
In this project, movements were applied to the frog skeleton using Three.js. The
movements included translation in four directions (forward, backward, right, and left),
rotations in four directions, and the ability to swim, jump, and stretch its front and rear
legs. Additionally, the frog was able to turn its neck to the left or right. To achieve these
movements, a file named 'index.js' was created to write the Three.js code in it. The right
and left rotations took place about the back of the skeleton, and the forward and
backward rotation was around the tail bone of the frog.
### Controls :
To control the movements of the frog, various keys were assigned specific functions. As
follows:
up, down, right, and left arrow keys were used for translation in the forward,
backward, right, and left directions, respectively and holding shift along the arrow
keys rotates the skeleton in the respective direction.
* The 'q' key was used to make the frog swim.
* 'j' to make it jump.
* 'w' to stretch its front legs forward.
* 's' to stretch its rear legs backward.
* 'a' key was used to turn the frog's neck to the left.
* 'd' key was used to turn it to the right. To rotate the frog, the user could press the
shift key along with the arrow keys.
* 'x' key allowed the user to see the ground, which was not visible by default. The
frog skeleton can be seen on any web browser, and these keys can be used to
control the movement of the frog skeleton.
* left mouse button is used to rotate the object
* right mouse button is used to change the camera position
* scroll wheel is used to zoom in and zoom out of the object.
## Shaders :
In the index.js file of our project, we have successfully implemented shaders using
three.js. Specifically, we have utilized the Phong shading technique to achieve a desired
visual effect. Phong shading is a widely-used shading model that simulates the way
light interacts with surfaces. It consists of two main components, the vertex shader and
the fragment shader. The vertex shader is responsible for transforming the 3D
coordinates of the geometry into the 2D space of the screen and calculating the normal
vectors and light vectors. The fragment shader, on the other hand, determines the color
and other properties of each pixel based on the lighting and material information.
With these shaders in place, we have applied them to the frog skeleton in our scene. Our
shading strategy results in the frog changing color on the basis of our viewing angle
along with from where the light is coming from and the normal vector for the vertex.
When light and viewing angles are same and normal is also along then the frog is the
brightest with bright color being yellow and the dim states showing a green hue. A
shader is also applied to the ground plane which works the same way but has an
ambient light that just gives light from every part to make it more visible and changes
color from light gray to dark gray as per the viewing angle and light position.
### Explanation of Shaders :
We have attached the code snippet of the Vertex and Fragment Shaders at the end.

Vertex Shader has three 3D vectors as Normal, Position and viewPosition.
* Normal calculates the normal values of the vertex normalizes it.
* Position calculates the Vertex Position and view matrix.
* viewPosition uses mvPosition that has where the model is in view coordinates.

Fragment Shader has
* vec3 lightDirection => it calculates the difference between light direction and
viewPosition.
* float diffuse => it calculates the dot product for the light angle and the normal
vector.
* vec3 ambient => it adds an ambient light to the mesh. i.e. every pixel brightens up
to make it more visible.
* vec3 halfway => it calculates the half way vector between light position and view
angle to use in specular.
* float specular => it calculates the dot product of the halfway vector and the
surface normal, raised to the power of 32. This gives a bright highlight to the
surface where the light is reflected most strongly.
* vec3 pointLightColor => it is from Uniform variable array that is used in
calculating final color by multiplying it with color vec3.
* vec 3 color => for the frog it uses mix to make the frog go from yellow to green in
light to dark respectively and for the plane it goes from gray to dark gray
(because of ambient light else it is black).
It also takes a Uniform variable array that takes two vectors of light position and light
color.
### Challenges faced while implementing Shaders :
Major challenge faced was the removal of skinning from the model. When using the
custom shader using ShaderMaterial it removes the rigged bones that are necessary for
animations and hence animation would not have been possible.
The solution we found out was including the common, skinning_pars_vertex,
skinbase_vertex, begin_vertex, beginnormal_vertex,
defaultnormal_vertexskinning_vertex, project_vertex these files in the Vertex Shader C
code. And using the mvPosition matrix to join the bones and mesh together.
