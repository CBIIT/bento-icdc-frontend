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



export const ProgramCard = ({ cardTitle, program_acronym, program_short_description, studies, program_external_url, program_name, primaryImageAlt, primaryImage, secondaryImage }) => {
    const history = useHistory();
    const count = studies?.length;
    return (
        <ProgramCardContainer>
            <ProgramHeader>
                <ProgramTitle>{program_name}</ProgramTitle>
                <StudiesCount>{count} STUDIES</StudiesCount>
            </ProgramHeader>
            <ProgramBody>
                <ProgramDescriptionActionWrapper>
                    <ProgramDescription>{program_short_description}</ProgramDescription>
                    <ActionWrapper>
                        <ActionButtonOne variant="contained" onClick={() => {
                            history.push(`/program/${program_acronym}`)
                        }}>Associated Studies</ActionButtonOne>
                        <ActionButtonTwo target="_blank" href={program_external_url} variant="contained" endIcon={<img src={pageData.externalIcon} style={{ width: '20px' }} />}>Go to site</ActionButtonTwo>
                    </ActionWrapper>
                </ProgramDescriptionActionWrapper>
                <ProgramImage src={primaryImage} alt={primaryImageAlt} className="program-image" />
            </ProgramBody>
        </ProgramCardContainer>
    );
};

export default ProgramCard;
