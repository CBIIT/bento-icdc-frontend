import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_ADVERSE_EVENT_CLINICAL_DATA,
  GET_AGENT_ADMINISTRATION_CLINICAL_DATA,
  GET_AGENT_CLINICAL_DATA,
  GET_CYCLE_CLINICAL_DATA,
  GET_DISEASE_EXTENT_CLINICAL_DATA,
  GET_FOLLOW_UP_CLINICAL_DATA,
  GET_LAB_EXAM_CLINICAL_DATA,
  GET_OFF_STUDY_CLINICAL_DATA,
  GET_OFF_TREATMENT_CLINICAL_DATA,
  GET_PHYSICAL_EXAM_CLINICAL_DATA,
  GET_PRIOR_SURGERY_CLINICAL_DATA,
  GET_PRIOR_THERAPY_CLINICAL_DATA,
  GET_VISIT_CLINICAL_DATA, GET_VITAL_SIGNS_CLINICAL_DATA,
} from '../../../../../bento/studyDetailsData';

// eslint-disable-next-line camelcase
const useFetchCSVDownload = (csvDownloadFlags, study_code) => {
  const [agentNodeCSV, setAgentNodeCSV] = useState([]);
  const [cycleNodeCSV, setCycleNodeCSV] = useState([]);
  const [visitNodeCSV, setVisitNodeCSV] = useState([]);
  const [priorTherapyNodeCSV, setPriorTherapyNodeCSV] = useState([]);
  const [priorSurgeryNodeCSV, setPriorSurgeryNodeCSV] = useState([]);
  const [agentAdministrationNodeCSV, setAgentAdministrationNodeCSV] = useState([]);
  const [physicalExamNodeCSV, setPhysicalExamNodeCSV] = useState([]);
  const [vitalSignsNodeCSV, setVitalSignsNodeCSV] = useState([]);
  const [labExamNodeCSV, setLabExamNodeCSV] = useState([]);
  const [adverseEventNodeCSV, setAdverseEventNodeCSV] = useState([]);
  const [diseaseExtentNodeCSV, setDiseaseExtentNodeCSV] = useState([]);
  const [followUpNodeCSV, setFollowUpNodeCSV] = useState([]);
  const [offStudyNodeCSV, setOffStudyNodeCSV] = useState([]);
  const [offTreatmentNodeCSV, setOffTreatmentNodeCSV] = useState([]);

  const { data: agentNodeData, isLoading: agentLoading } = useQuery(GET_AGENT_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setAgentNodeCSV(agentNodeData?.agentNodeData),
  });

  const { data: cycleNodeData, isLoading: cycleLoading } = useQuery(GET_CYCLE_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setCycleNodeCSV(cycleNodeData?.cycleNodeData),
  });

  const { data: visitNodeData, isLoading: visitLoading } = useQuery(GET_VISIT_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setVisitNodeCSV(visitNodeData?.visitNodeData),
  });

  const {
    data: priorTherapyNodeData,
    isLoading: priorTherapyLoading,
  } = useQuery(GET_PRIOR_THERAPY_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setPriorTherapyNodeCSV(priorTherapyNodeData?.priorTherapyNodeData),
  });

  const {
    data: priorSurgeryNodeData,
    isLoading: priorSurgeryLoading,
  } = useQuery(GET_PRIOR_SURGERY_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setPriorSurgeryNodeCSV(priorSurgeryNodeData?.priorSurgeryNodeData),
  });

  const {
    data: agentAdministrationNodeData,
    isLoading: agentAdministrationLoading,
  } = useQuery(GET_AGENT_ADMINISTRATION_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted:
        () => setAgentAdministrationNodeCSV(
            agentAdministrationNodeData?.agentAdministrationNodeData,
        ),
  });

  const {
    data: physicalExamNodeData,
    isLoading: physicalExamLoading,
  } = useQuery(GET_PHYSICAL_EXAM_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setPhysicalExamNodeCSV(physicalExamNodeData?.physicalExamNodeData),
  });

  const {
    data: vitalSignsNodeData,
    isLoading: vitalSignsLoading,
  } = useQuery(GET_VITAL_SIGNS_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setVitalSignsNodeCSV(vitalSignsNodeData?.vitalSignsNodeData),
  });

  const {
    data: labExamNodeData,
    isLoading: labExamLoading,
  } = useQuery(GET_LAB_EXAM_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setLabExamNodeCSV(labExamNodeData?.labExamNodeData),
  });

  const {
    data: adverseEventNodeData,
    isLoading: adverseEventLoading,
  } = useQuery(GET_ADVERSE_EVENT_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setAdverseEventNodeCSV(adverseEventNodeData?.adverseEventNodeData),
  });

  const {
    data: diseaseExtentNodeData,
    isLoading: diseaseExtentLoading,
  } = useQuery(GET_DISEASE_EXTENT_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setDiseaseExtentNodeCSV(diseaseExtentNodeData?.diseaseExtentNodeData),
  });

  const {
    data: followUpNodeData,
    isLoading: followUpLoading,
  } = useQuery(GET_FOLLOW_UP_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setFollowUpNodeCSV(followUpNodeData?.followUpNodeData),
  });

  const {
    data: offStudyNodeData,
    isLoading: offStudyLoading,
  } = useQuery(GET_OFF_STUDY_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setOffStudyNodeCSV(offStudyNodeData?.offStudyNodeData),
  });

  const {
    data: offTreatmentNodeData,
    isLoading: offTreatmentLoading,
  } = useQuery(GET_OFF_TREATMENT_CLINICAL_DATA, {
    variables: {
      study_code,
    },
    onCompleted: () => setOffTreatmentNodeCSV(offTreatmentNodeData?.offTreatmentNodeData),
  });

  const isLoading = agentLoading
      || cycleLoading
      || visitLoading
      || priorTherapyLoading
      || priorSurgeryLoading
      || agentAdministrationLoading
      || vitalSignsLoading
      || labExamLoading
      || adverseEventLoading
      || diseaseExtentLoading
      || followUpLoading
      || offStudyLoading
      || offTreatmentLoading
      || physicalExamLoading;

  return [
    agentNodeCSV,
    cycleNodeCSV,
    visitNodeCSV,
    priorTherapyNodeCSV,
    priorSurgeryNodeCSV,
    agentAdministrationNodeCSV,
    physicalExamNodeCSV,
    vitalSignsNodeCSV,
    labExamNodeCSV,
    adverseEventNodeCSV,
    diseaseExtentNodeCSV,
    followUpNodeCSV,
    offStudyNodeCSV,
    offTreatmentNodeCSV,
    isLoading,
  ];
};

export default useFetchCSVDownload;
