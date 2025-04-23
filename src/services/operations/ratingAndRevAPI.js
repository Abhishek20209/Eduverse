import {ratingsEndpoints} from "../apis";

const {
    REVIEWS_DETAILS_API,
    AVERAGE_RATING_API
}=ratingsEndpoints;

export function getAverageRatings(courseId){
    return async (dispatch) => {

        try{

            const response = await apiConnector("GET", AVERAGE_RATING_API, {
                courseId
            });
    
            console.log("get average rating API response",response);

        }
        catch(error){
            console.log("AVERAGE RATING API ERROR............", error);
        }
        
    }
}