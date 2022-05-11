
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";
import { Fragment } from "react";
import { Head } from "next/head";
function MeetupDetails(props) {
  return (
      <Fragment>
          <Head>
              <title> {props.meetupData.title}</title>
          <meta name='desc' content={props.meetupData.description} /> 
          </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
   
    />
   </Fragment>
  );
}
export async function getStaticPaths(){
    const client = await MongoClient.connect(
        "mongodb+srv://Samruddhi:Samarekar87@cluster0.0cogj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
      client.close();
    return{
        fallback:'Blocking',
        paths:meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
          })),
    }
}
export async function getStaticProps(context){
   
    const client = await MongoClient.connect(
        "mongodb+srv://Samruddhi:Samarekar87@cluster0.0cogj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const selectedMeetup=await meetupsCollection.findOne({_id:ObjectId(meetupId)})
      client.close();
    // return{
    //     fallback:false,
    //     paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()},}))
        
    // }
//  const meetupId=context.params.meetupId;
//  console.log(meetupId);
    return{
        props:{
            meetupData:{
                id: selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                image:selectedMeetup.image,
                description:selectedMeetup.description,
            }
        }
    }
}
export default MeetupDetails;
