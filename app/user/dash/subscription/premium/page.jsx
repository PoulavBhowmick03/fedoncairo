import Sidebar from "../../../components/Sidebar";
import SubDetails from "../../../../../components/SubDetails";


const Premium = () => {
    return ( 
        <div className="h-screen">
        <Sidebar/> 
        <div className="sm:pl-24 ">

        <SubDetails
            planType="Premium"
            cost="$20"
            description="Unlock premium features and enhanced support."
            isActive={false}
            additionalText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum felis libero, in eleifend turpis tincidunt nec. Integer malesuada risus et arcu pharetra, id dignissim ligula luctus. Nulla facilisi. In at lectus in turpis fermentum blandit non id nulla. Cras ut mauris at velit hendrerit egestas. Ut pulvinar semper justo, vitae posuere arcu facilisis a. Vivamus gravida nibh id urna tincidunt fermentum. Proin ac urna quis sapien ultricies gravida ut sit amet nunc. Mauris et lorem sit amet nisl feugiat tincidunt non vel metus."
        />
         </div>
        </div>
     );
}
 
export default Premium;