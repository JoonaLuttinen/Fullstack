






const Part = ({part, exercises}) => {
  return (
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Content = ({content}) => {


  const total = content.reduce((sum, current) => {return sum + current.exercises},0)
  
  return (
    <div>
      {content.map(content => <Part key = {content.id} part = {content.name} exercises={content.exercises} />)}
      <h3>total of {total} exercises</h3>    
    </div>
  )

}

const Header = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )

}

const Course = ({courses}) => {
  
/*   const header = (course) => {
    return (<Header title = {course.name}/>)
  } */
  return (
    <div>
      {courses.map((course) => { return (<Header title ={course.name} key = {course.id}/>)})}
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}


export default App
