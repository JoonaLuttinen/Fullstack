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
  
const Course = ({course}) => {
    
    return (
      <div>
        <Header title = {course.name}/>
        <Content content = {course.parts}/>
      </div>
    )
}

export default Course