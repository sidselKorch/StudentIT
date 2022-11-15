import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

export const CourseApi = () => {
    const [courses, setCourses] = useState(null);

    async function fetchCourses() {
        // create your Parse Query using the Person Class you've created
        const query = new Parse.Query('Course');
        // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
        query.equalTo('studentid', '2');
        // run the query
        const Course = await query.first();
        // access the Parse Object attributes
        console.log('courses studentid: ', Course.get('studentid'));
        console.log('courses coursename: ', Course.get('Course'));
        console.log('courses coursecolor: ', Course.get('Color'));
        console.log('courses id: ', Course.id);
        setCourses(Course);
      }

      return (
        <div>
          <button onClick={fetchCourses}>Fetch Courses</button>
          {courses !== null && (
            <div>
              <p>{`Student: ${courses.get('studentid')}`}</p>
              <p>{`Course: ${courses.get('Course')}`}</p>
              <p>{`Color: ${courses.get('Color')}`}</p>
            </div>
          )}
        </div>
      );
};

