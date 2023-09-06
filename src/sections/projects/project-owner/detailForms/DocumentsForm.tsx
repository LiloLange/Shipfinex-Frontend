// next
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
// material-ui
import { Button, FormHelperText, Grid, IconButton, InputLabel, Stack, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
// assets
import { CloudUploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

const validationSchema = yup.object({
  technicalReport: yup.mixed().required('Technical Report is required'),
  financialReport: yup.mixed().required('Financial Report is required'),
  commercialReport: yup.mixed().required('Commercial Report is required'),
  risk: yup.mixed().required('Risk is required'),
  community: yup.mixed().required('Community is required'),
  vesselCertificate: yup.mixed().required('Vessel Certificate is required')
});

type BootstrapFormItemProps = {
  label: string;
  index: string;
  formik: any;
};

const BootstrapFormItem = ({ label, index, formik }: BootstrapFormItemProps) => {
  return (
    <Grid item xs={12} mb={2}>
      <Stack spacing={0.5}>
        <InputLabel>{label} *</InputLabel>
        {formik.values[index] === undefined && (
          <Button variant="outlined" component="label">
            <CloudUploadOutlined />
            <Typography ml={1}>Upload {label}</Typography>
            <input
              accept={acceptFileTypes}
              multiple
              hidden
              type="file"
              onChange={(ev) => {
                if (ev.currentTarget.files && ev.currentTarget.files[0]) {
                  formik.setFieldValue(index, ev.currentTarget.files[0]);
                }
              }}
            />
          </Button>
        )}
        {formik.values[index] && (
          <>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              bgcolor={antColors.blue[0]}
              px={2}
              borderRadius={1}
              py={0.5}
              justifyContent="space-between"
            >
              <Typography>{formik.values[index].name}</Typography>
              <IconButton onClick={() => formik.setFieldValue(index, undefined)}>
                <CloseCircleOutlined style={{ color: antColors.blue[4] }} aria-label="Review" title="Review" />
              </IconButton>
            </Stack>
          </>
        )}
        {formik.touched[index] && formik.errors[index] && (
          <FormHelperText error id={`standard-weight-helper-text-${index}-login`}>
            {formik.errors[index]}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
  );
};

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type Documents = {
  technicalReport?: File;
  financialReport?: File;
  commercialReport?: File;
  risk?: File;
  community?: File;
  vesselCertificate?: File;
};

interface DocumentsFormProps {
  documents: Documents;
  setDocuments: (d: Documents) => void;
  handleNext: () => void;
  projectId?: string;
}

const acceptFileTypes = 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*';

export default function DocumentsForm({ documents, setDocuments, handleNext, projectId }: DocumentsFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      technicalReport: documents.technicalReport,
      financialReport: documents.financialReport,
      commercialReport: documents.commercialReport,
      risk: documents.risk,
      community: documents.community,
      vesselCertificate: documents.vesselCertificate
    },
    validationSchema,
    onSubmit: (values) => {
      const shipDocuments = {
        technicalReport: values.technicalReport,
        financialReport: values.financialReport,
        commercialReport: values.commercialReport,
        risk: values.risk,
        community: values.community,
        vesselCertificate: values.vesselCertificate
      };

      const formData = new FormData();
      formData.append('technicalReport', shipDocuments.technicalReport as any);
      formData.append('financialReport', shipDocuments.financialReport as any);
      formData.append('commercialReport', shipDocuments.commercialReport as any);
      formData.append('risk', shipDocuments.risk as any);
      formData.append('community', shipDocuments.community as any);
      formData.append('vesselCertificate', shipDocuments.vesselCertificate as any);
      console.log(projectId);
      setDocuments(shipDocuments);
      axios.defaults.headers.common = { Authorization: `bearer ${session?.token.accessToken as string}` };
      axios
        .post(`${process.env.SHIPFINEX_BACKEND_URL}/project/${projectId}/documents`, formData)
        .then(async (res) => {
          if (res.status === 401) {
            signOut({ redirect: false });

            router.push({
              pathname: '/signin',
              query: {}
            });
          } else {
            handleNext();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      handleNext();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <BootstrapFormItem formik={formik} index="technicalReport" label="Technical Report" />
          <BootstrapFormItem formik={formik} index="financialReport" label="Financial Report" />
          <BootstrapFormItem formik={formik} index="commercialReport" label="Commercial Report" />
          <BootstrapFormItem formik={formik} index="risk" label="Risk" />
          <BootstrapFormItem formik={formik} index="community" label="Community" />
          <BootstrapFormItem formik={formik} index="vesselCertificate" label="Vessel Certificate" />
          {router.query.projectId === 'add' && (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="end">
                <AnimateButton>
                  <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }}>
                    Upload Documents
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
}
