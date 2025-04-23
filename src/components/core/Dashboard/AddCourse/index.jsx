import RenderSteps from "./RenderSteps"

export default function AddCourse(){
    return (
        <>
            <div className="text-white">
                <div>
                    <h1>Add Course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div>
                    <p>Code upload tips</p>
                    <ul>
                        <li>Set the course price option or make it free. </li>
                        <li>Standard size for course thumbNail is 1024*576. </li>
                        <li>Video sections controls the course overview video. </li>
                        <li>Add topics in course builder section to create lessons, quizzes and assignment</li>
                    </ul>
                </div>
            </div>
        </>
    )
}