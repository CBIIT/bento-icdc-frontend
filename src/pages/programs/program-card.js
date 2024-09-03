import React from 'react';
import { pageDataV2 as pageData } from '../../bento/programData';
import { useHistory } from "react-router-dom";
import {
    ProgramCardContainer,
    ProgramHeader,
    ProgramTitle,
    StudiesCount,
    ProgramBody,
    ProgramDescriptionActionWrapper,
    ProgramDescription,
    ActionWrapper,
    ProgramImage,
    ActionButtonOne,
    ActionButtonTwo
} from './program-card.styled';



export const ProgramCard = ({ program_acronym, program_short_description, studies, program_external_url, program_name, primaryImageAlt, primaryImage }) => {
    const history = useHistory();
    const count = studies?.length;

    const handleNavigate = () => {
        history.push(`/program/${program_acronym}`)
    }

    return (
        <ProgramCardContainer>
            <ProgramHeader>
                <ProgramTitle>{program_name}</ProgramTitle>
                <StudiesCount onClick={handleNavigate}>{count} STUDIES</StudiesCount>
            </ProgramHeader>
            <ProgramBody>
                <ProgramDescriptionActionWrapper>
                    <ProgramDescription>{program_short_description}</ProgramDescription>
                    <ActionWrapper>
                        <ActionButtonOne variant="contained" onClick={handleNavigate}>Associated Studies</ActionButtonOne>
                        {program_external_url && <ActionButtonTwo target="_blank" href={program_external_url} variant="contained" endIcon={<img src={pageData.externalIcon} alt='external-link-icon' style={{ width: '20px' }} />}>Go to site</ActionButtonTwo>
                        }
                    </ActionWrapper>
                </ProgramDescriptionActionWrapper>
                <ProgramImage src={primaryImage} alt={primaryImageAlt} className="program-image" />
            </ProgramBody>
        </ProgramCardContainer>
    );
};

export default ProgramCard;
