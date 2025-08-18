/* chunk:305 bytes:[7114236, 7131840) size:17604 source:unpacked-cli.js */
var Af2 = E((lu) => {
    var E46 = lu && lu.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        U46 = lu && lu.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) E46(B, A, Q)
        };
    Object.defineProperty(lu, "__esModule", {
        value: !0
    });
    U46(eb2(), lu)
});
var Sg2 = E((Rg2) => {
    Object.defineProperty(Rg2, "__esModule", {
        value: !0
    });
    Rg2.SEMRESATTRS_K8S_STATEFULSET_NAME = Rg2.SEMRESATTRS_K8S_STATEFULSET_UID = Rg2.SEMRESATTRS_K8S_DEPLOYMENT_NAME = Rg2.SEMRESATTRS_K8S_DEPLOYMENT_UID = Rg2.SEMRESATTRS_K8S_REPLICASET_NAME = Rg2.SEMRESATTRS_K8S_REPLICASET_UID = Rg2.SEMRESATTRS_K8S_CONTAINER_NAME = Rg2.SEMRESATTRS_K8S_POD_NAME = Rg2.SEMRESATTRS_K8S_POD_UID = Rg2.SEMRESATTRS_K8S_NAMESPACE_NAME = Rg2.SEMRESATTRS_K8S_NODE_UID = Rg2.SEMRESATTRS_K8S_NODE_NAME = Rg2.SEMRESATTRS_K8S_CLUSTER_NAME = Rg2.SEMRESATTRS_HOST_IMAGE_VERSION = Rg2.SEMRESATTRS_HOST_IMAGE_ID = Rg2.SEMRESATTRS_HOST_IMAGE_NAME = Rg2.SEMRESATTRS_HOST_ARCH = Rg2.SEMRESATTRS_HOST_TYPE = Rg2.SEMRESATTRS_HOST_NAME = Rg2.SEMRESATTRS_HOST_ID = Rg2.SEMRESATTRS_FAAS_MAX_MEMORY = Rg2.SEMRESATTRS_FAAS_INSTANCE = Rg2.SEMRESATTRS_FAAS_VERSION = Rg2.SEMRESATTRS_FAAS_ID = Rg2.SEMRESATTRS_FAAS_NAME = Rg2.SEMRESATTRS_DEVICE_MODEL_NAME = Rg2.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = Rg2.SEMRESATTRS_DEVICE_ID = Rg2.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = Rg2.SEMRESATTRS_CONTAINER_IMAGE_TAG = Rg2.SEMRESATTRS_CONTAINER_IMAGE_NAME = Rg2.SEMRESATTRS_CONTAINER_RUNTIME = Rg2.SEMRESATTRS_CONTAINER_ID = Rg2.SEMRESATTRS_CONTAINER_NAME = Rg2.SEMRESATTRS_AWS_LOG_STREAM_ARNS = Rg2.SEMRESATTRS_AWS_LOG_STREAM_NAMES = Rg2.SEMRESATTRS_AWS_LOG_GROUP_ARNS = Rg2.SEMRESATTRS_AWS_LOG_GROUP_NAMES = Rg2.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = Rg2.SEMRESATTRS_AWS_ECS_TASK_REVISION = Rg2.SEMRESATTRS_AWS_ECS_TASK_FAMILY = Rg2.SEMRESATTRS_AWS_ECS_TASK_ARN = Rg2.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = Rg2.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = Rg2.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = Rg2.SEMRESATTRS_CLOUD_PLATFORM = Rg2.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = Rg2.SEMRESATTRS_CLOUD_REGION = Rg2.SEMRESATTRS_CLOUD_ACCOUNT_ID = Rg2.SEMRESATTRS_CLOUD_PROVIDER = void 0;
    Rg2.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = Rg2.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = Rg2.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = Rg2.CLOUDPLATFORMVALUES_AZURE_AKS = Rg2.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = Rg2.CLOUDPLATFORMVALUES_AZURE_VM = Rg2.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = Rg2.CLOUDPLATFORMVALUES_AWS_LAMBDA = Rg2.CLOUDPLATFORMVALUES_AWS_EKS = Rg2.CLOUDPLATFORMVALUES_AWS_ECS = Rg2.CLOUDPLATFORMVALUES_AWS_EC2 = Rg2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = Rg2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = Rg2.CloudProviderValues = Rg2.CLOUDPROVIDERVALUES_GCP = Rg2.CLOUDPROVIDERVALUES_AZURE = Rg2.CLOUDPROVIDERVALUES_AWS = Rg2.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = Rg2.SemanticResourceAttributes = Rg2.SEMRESATTRS_WEBENGINE_DESCRIPTION = Rg2.SEMRESATTRS_WEBENGINE_VERSION = Rg2.SEMRESATTRS_WEBENGINE_NAME = Rg2.SEMRESATTRS_TELEMETRY_AUTO_VERSION = Rg2.SEMRESATTRS_TELEMETRY_SDK_VERSION = Rg2.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = Rg2.SEMRESATTRS_TELEMETRY_SDK_NAME = Rg2.SEMRESATTRS_SERVICE_VERSION = Rg2.SEMRESATTRS_SERVICE_INSTANCE_ID = Rg2.SEMRESATTRS_SERVICE_NAMESPACE = Rg2.SEMRESATTRS_SERVICE_NAME = Rg2.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = Rg2.SEMRESATTRS_PROCESS_RUNTIME_VERSION = Rg2.SEMRESATTRS_PROCESS_RUNTIME_NAME = Rg2.SEMRESATTRS_PROCESS_OWNER = Rg2.SEMRESATTRS_PROCESS_COMMAND_ARGS = Rg2.SEMRESATTRS_PROCESS_COMMAND_LINE = Rg2.SEMRESATTRS_PROCESS_COMMAND = Rg2.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = Rg2.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = Rg2.SEMRESATTRS_PROCESS_PID = Rg2.SEMRESATTRS_OS_VERSION = Rg2.SEMRESATTRS_OS_NAME = Rg2.SEMRESATTRS_OS_DESCRIPTION = Rg2.SEMRESATTRS_OS_TYPE = Rg2.SEMRESATTRS_K8S_CRONJOB_NAME = Rg2.SEMRESATTRS_K8S_CRONJOB_UID = Rg2.SEMRESATTRS_K8S_JOB_NAME = Rg2.SEMRESATTRS_K8S_JOB_UID = Rg2.SEMRESATTRS_K8S_DAEMONSET_NAME = Rg2.SEMRESATTRS_K8S_DAEMONSET_UID = void 0;
    Rg2.TelemetrySdkLanguageValues = Rg2.TELEMETRYSDKLANGUAGEVALUES_WEBJS = Rg2.TELEMETRYSDKLANGUAGEVALUES_RUBY = Rg2.TELEMETRYSDKLANGUAGEVALUES_PYTHON = Rg2.TELEMETRYSDKLANGUAGEVALUES_PHP = Rg2.TELEMETRYSDKLANGUAGEVALUES_NODEJS = Rg2.TELEMETRYSDKLANGUAGEVALUES_JAVA = Rg2.TELEMETRYSDKLANGUAGEVALUES_GO = Rg2.TELEMETRYSDKLANGUAGEVALUES_ERLANG = Rg2.TELEMETRYSDKLANGUAGEVALUES_DOTNET = Rg2.TELEMETRYSDKLANGUAGEVALUES_CPP = Rg2.OsTypeValues = Rg2.OSTYPEVALUES_Z_OS = Rg2.OSTYPEVALUES_SOLARIS = Rg2.OSTYPEVALUES_AIX = Rg2.OSTYPEVALUES_HPUX = Rg2.OSTYPEVALUES_DRAGONFLYBSD = Rg2.OSTYPEVALUES_OPENBSD = Rg2.OSTYPEVALUES_NETBSD = Rg2.OSTYPEVALUES_FREEBSD = Rg2.OSTYPEVALUES_DARWIN = Rg2.OSTYPEVALUES_LINUX = Rg2.OSTYPEVALUES_WINDOWS = Rg2.HostArchValues = Rg2.HOSTARCHVALUES_X86 = Rg2.HOSTARCHVALUES_PPC64 = Rg2.HOSTARCHVALUES_PPC32 = Rg2.HOSTARCHVALUES_IA64 = Rg2.HOSTARCHVALUES_ARM64 = Rg2.HOSTARCHVALUES_ARM32 = Rg2.HOSTARCHVALUES_AMD64 = Rg2.AwsEcsLaunchtypeValues = Rg2.AWSECSLAUNCHTYPEVALUES_FARGATE = Rg2.AWSECSLAUNCHTYPEVALUES_EC2 = Rg2.CloudPlatformValues = Rg2.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = Rg2.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = Rg2.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = Rg2.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = void 0;
    var pu = jY0(),
        Bf2 = "cloud.provider",
        Qf2 = "cloud.account.id",
        Zf2 = "cloud.region",
        Df2 = "cloud.availability_zone",
        Gf2 = "cloud.platform",
        Ff2 = "aws.ecs.container.arn",
        If2 = "aws.ecs.cluster.arn",
        Yf2 = "aws.ecs.launchtype",
        Wf2 = "aws.ecs.task.arn",
        Jf2 = "aws.ecs.task.family",
        Xf2 = "aws.ecs.task.revision",
        Vf2 = "aws.eks.cluster.arn",
        Cf2 = "aws.log.group.names",
        Kf2 = "aws.log.group.arns",
        Hf2 = "aws.log.stream.names",
        zf2 = "aws.log.stream.arns",
        Ef2 = "container.name",
        Uf2 = "container.id",
        wf2 = "container.runtime",
        $f2 = "container.image.name",
        qf2 = "container.image.tag",
        Nf2 = "deployment.environment",
        Lf2 = "device.id",
        Mf2 = "device.model.identifier",
        Rf2 = "device.model.name",
        Of2 = "faas.name",
        Tf2 = "faas.id",
        Pf2 = "faas.version",
        Sf2 = "faas.instance",
        jf2 = "faas.max_memory",
        kf2 = "host.id",
        yf2 = "host.name",
        _f2 = "host.type",
        xf2 = "host.arch",
        vf2 = "host.image.name",
        bf2 = "host.image.id",
        ff2 = "host.image.version",
        hf2 = "k8s.cluster.name",
        gf2 = "k8s.node.name",
        uf2 = "k8s.node.uid",
        mf2 = "k8s.namespace.name",
        df2 = "k8s.pod.uid",
        cf2 = "k8s.pod.name",
        lf2 = "k8s.container.name",
        pf2 = "k8s.replicaset.uid",
        if2 = "k8s.replicaset.name",
        nf2 = "k8s.deployment.uid",
        af2 = "k8s.deployment.name",
        sf2 = "k8s.statefulset.uid",
        rf2 = "k8s.statefulset.name",
        of2 = "k8s.daemonset.uid",
        tf2 = "k8s.daemonset.name",
        ef2 = "k8s.job.uid",
        Ah2 = "k8s.job.name",
        Bh2 = "k8s.cronjob.uid",
        Qh2 = "k8s.cronjob.name",
        Zh2 = "os.type",
        Dh2 = "os.description",
        Gh2 = "os.name",
        Fh2 = "os.version",
        Ih2 = "process.pid",
        Yh2 = "process.executable.name",
        Wh2 = "process.executable.path",
        Jh2 = "process.command",
        Xh2 = "process.command_line",
        Vh2 = "process.command_args",
        Ch2 = "process.owner",
        Kh2 = "process.runtime.name",
        Hh2 = "process.runtime.version",
        zh2 = "process.runtime.description",
        Eh2 = "service.name",
        Uh2 = "service.namespace",
        wh2 = "service.instance.id",
        $h2 = "service.version",
        qh2 = "telemetry.sdk.name",
        Nh2 = "telemetry.sdk.language",
        Lh2 = "telemetry.sdk.version",
        Mh2 = "telemetry.auto.version",
        Rh2 = "webengine.name",
        Oh2 = "webengine.version",
        Th2 = "webengine.description";
    Rg2.SEMRESATTRS_CLOUD_PROVIDER = Bf2;
    Rg2.SEMRESATTRS_CLOUD_ACCOUNT_ID = Qf2;
    Rg2.SEMRESATTRS_CLOUD_REGION = Zf2;
    Rg2.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = Df2;
    Rg2.SEMRESATTRS_CLOUD_PLATFORM = Gf2;
    Rg2.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = Ff2;
    Rg2.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = If2;
    Rg2.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = Yf2;
    Rg2.SEMRESATTRS_AWS_ECS_TASK_ARN = Wf2;
    Rg2.SEMRESATTRS_AWS_ECS_TASK_FAMILY = Jf2;
    Rg2.SEMRESATTRS_AWS_ECS_TASK_REVISION = Xf2;
    Rg2.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = Vf2;
    Rg2.SEMRESATTRS_AWS_LOG_GROUP_NAMES = Cf2;
    Rg2.SEMRESATTRS_AWS_LOG_GROUP_ARNS = Kf2;
    Rg2.SEMRESATTRS_AWS_LOG_STREAM_NAMES = Hf2;
    Rg2.SEMRESATTRS_AWS_LOG_STREAM_ARNS = zf2;
    Rg2.SEMRESATTRS_CONTAINER_NAME = Ef2;
    Rg2.SEMRESATTRS_CONTAINER_ID = Uf2;
    Rg2.SEMRESATTRS_CONTAINER_RUNTIME = wf2;
    Rg2.SEMRESATTRS_CONTAINER_IMAGE_NAME = $f2;
    Rg2.SEMRESATTRS_CONTAINER_IMAGE_TAG = qf2;
    Rg2.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = Nf2;
    Rg2.SEMRESATTRS_DEVICE_ID = Lf2;
    Rg2.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = Mf2;
    Rg2.SEMRESATTRS_DEVICE_MODEL_NAME = Rf2;
    Rg2.SEMRESATTRS_FAAS_NAME = Of2;
    Rg2.SEMRESATTRS_FAAS_ID = Tf2;
    Rg2.SEMRESATTRS_FAAS_VERSION = Pf2;
    Rg2.SEMRESATTRS_FAAS_INSTANCE = Sf2;
    Rg2.SEMRESATTRS_FAAS_MAX_MEMORY = jf2;
    Rg2.SEMRESATTRS_HOST_ID = kf2;
    Rg2.SEMRESATTRS_HOST_NAME = yf2;
    Rg2.SEMRESATTRS_HOST_TYPE = _f2;
    Rg2.SEMRESATTRS_HOST_ARCH = xf2;
    Rg2.SEMRESATTRS_HOST_IMAGE_NAME = vf2;
    Rg2.SEMRESATTRS_HOST_IMAGE_ID = bf2;
    Rg2.SEMRESATTRS_HOST_IMAGE_VERSION = ff2;
    Rg2.SEMRESATTRS_K8S_CLUSTER_NAME = hf2;
    Rg2.SEMRESATTRS_K8S_NODE_NAME = gf2;
    Rg2.SEMRESATTRS_K8S_NODE_UID = uf2;
    Rg2.SEMRESATTRS_K8S_NAMESPACE_NAME = mf2;
    Rg2.SEMRESATTRS_K8S_POD_UID = df2;
    Rg2.SEMRESATTRS_K8S_POD_NAME = cf2;
    Rg2.SEMRESATTRS_K8S_CONTAINER_NAME = lf2;
    Rg2.SEMRESATTRS_K8S_REPLICASET_UID = pf2;
    Rg2.SEMRESATTRS_K8S_REPLICASET_NAME = if2;
    Rg2.SEMRESATTRS_K8S_DEPLOYMENT_UID = nf2;
    Rg2.SEMRESATTRS_K8S_DEPLOYMENT_NAME = af2;
    Rg2.SEMRESATTRS_K8S_STATEFULSET_UID = sf2;
    Rg2.SEMRESATTRS_K8S_STATEFULSET_NAME = rf2;
    Rg2.SEMRESATTRS_K8S_DAEMONSET_UID = of2;
    Rg2.SEMRESATTRS_K8S_DAEMONSET_NAME = tf2;
    Rg2.SEMRESATTRS_K8S_JOB_UID = ef2;
    Rg2.SEMRESATTRS_K8S_JOB_NAME = Ah2;
    Rg2.SEMRESATTRS_K8S_CRONJOB_UID = Bh2;
    Rg2.SEMRESATTRS_K8S_CRONJOB_NAME = Qh2;
    Rg2.SEMRESATTRS_OS_TYPE = Zh2;
    Rg2.SEMRESATTRS_OS_DESCRIPTION = Dh2;
    Rg2.SEMRESATTRS_OS_NAME = Gh2;
    Rg2.SEMRESATTRS_OS_VERSION = Fh2;
    Rg2.SEMRESATTRS_PROCESS_PID = Ih2;
    Rg2.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = Yh2;
    Rg2.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = Wh2;
    Rg2.SEMRESATTRS_PROCESS_COMMAND = Jh2;
    Rg2.SEMRESATTRS_PROCESS_COMMAND_LINE = Xh2;
    Rg2.SEMRESATTRS_PROCESS_COMMAND_ARGS = Vh2;
    Rg2.SEMRESATTRS_PROCESS_OWNER = Ch2;
    Rg2.SEMRESATTRS_PROCESS_RUNTIME_NAME = Kh2;
    Rg2.SEMRESATTRS_PROCESS_RUNTIME_VERSION = Hh2;
    Rg2.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = zh2;
    Rg2.SEMRESATTRS_SERVICE_NAME = Eh2;
    Rg2.SEMRESATTRS_SERVICE_NAMESPACE = Uh2;
    Rg2.SEMRESATTRS_SERVICE_INSTANCE_ID = wh2;
    Rg2.SEMRESATTRS_SERVICE_VERSION = $h2;
    Rg2.SEMRESATTRS_TELEMETRY_SDK_NAME = qh2;
    Rg2.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = Nh2;
    Rg2.SEMRESATTRS_TELEMETRY_SDK_VERSION = Lh2;
    Rg2.SEMRESATTRS_TELEMETRY_AUTO_VERSION = Mh2;
    Rg2.SEMRESATTRS_WEBENGINE_NAME = Rh2;
    Rg2.SEMRESATTRS_WEBENGINE_VERSION = Oh2;
    Rg2.SEMRESATTRS_WEBENGINE_DESCRIPTION = Th2;
    Rg2.SemanticResourceAttributes = pu.createConstMap([Bf2, Qf2, Zf2, Df2, Gf2, Ff2, If2, Yf2, Wf2, Jf2, Xf2, Vf2, Cf2, Kf2, Hf2, zf2, Ef2, Uf2, wf2, $f2, qf2, Nf2, Lf2, Mf2, Rf2, Of2, Tf2, Pf2, Sf2, jf2, kf2, yf2, _f2, xf2, vf2, bf2, ff2, hf2, gf2, uf2, mf2, df2, cf2, lf2, pf2, if2, nf2, af2, sf2, rf2, of2, tf2, ef2, Ah2, Bh2, Qh2, Zh2, Dh2, Gh2, Fh2, Ih2, Yh2, Wh2, Jh2, Xh2, Vh2, Ch2, Kh2, Hh2, zh2, Eh2, Uh2, wh2, $h2, qh2, Nh2, Lh2, Mh2, Rh2, Oh2, Th2]);
    var Ph2 = "alibaba_cloud",
        Sh2 = "aws",
        jh2 = "azure",
        kh2 = "gcp";
    Rg2.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = Ph2;
    Rg2.CLOUDPROVIDERVALUES_AWS = Sh2;
    Rg2.CLOUDPROVIDERVALUES_AZURE = jh2;
    Rg2.CLOUDPROVIDERVALUES_GCP = kh2;
    Rg2.CloudProviderValues = pu.createConstMap([Ph2, Sh2, jh2, kh2]);
    var yh2 = "alibaba_cloud_ecs",
        _h2 = "alibaba_cloud_fc",
        xh2 = "aws_ec2",
        vh2 = "aws_ecs",
        bh2 = "aws_eks",
        fh2 = "aws_lambda",
        hh2 = "aws_elastic_beanstalk",
        gh2 = "azure_vm",
        uh2 = "azure_container_instances",
        mh2 = "azure_aks",
        dh2 = "azure_functions",
        ch2 = "azure_app_service",
        lh2 = "gcp_compute_engine",
        ph2 = "gcp_cloud_run",
        ih2 = "gcp_kubernetes_engine",
        nh2 = "gcp_cloud_functions",
        ah2 = "gcp_app_engine";
    Rg2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = yh2;
    Rg2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = _h2;
    Rg2.CLOUDPLATFORMVALUES_AWS_EC2 = xh2;
    Rg2.CLOUDPLATFORMVALUES_AWS_ECS = vh2;
    Rg2.CLOUDPLATFORMVALUES_AWS_EKS = bh2;
    Rg2.CLOUDPLATFORMVALUES_AWS_LAMBDA = fh2;
    Rg2.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = hh2;
    Rg2.CLOUDPLATFORMVALUES_AZURE_VM = gh2;
    Rg2.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = uh2;
    Rg2.CLOUDPLATFORMVALUES_AZURE_AKS = mh2;
    Rg2.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = dh2;
    Rg2.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = ch2;
    Rg2.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = lh2;
    Rg2.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = ph2;
    Rg2.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = ih2;
    Rg2.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = nh2;
    Rg2.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = ah2;
    Rg2.CloudPlatformValues = pu.createConstMap([yh2, _h2, xh2, vh2, bh2, fh2, hh2, gh2, uh2, mh2, dh2, ch2, lh2, ph2, ih2, nh2, ah2]);
    var sh2 = "ec2",
        rh2 = "fargate";
    Rg2.AWSECSLAUNCHTYPEVALUES_EC2 = sh2;
    Rg2.AWSECSLAUNCHTYPEVALUES_FARGATE = rh2;
    Rg2.AwsEcsLaunchtypeValues = pu.createConstMap([sh2, rh2]);
    var oh2 = "amd64",
        th2 = "arm32",
        eh2 = "arm64",
        Ag2 = "ia64",
        Bg2 = "ppc32",
        Qg2 = "ppc64",
        Zg2 = "x86";
    Rg2.HOSTARCHVALUES_AMD64 = oh2;
    Rg2.HOSTARCHVALUES_ARM32 = th2;
    Rg2.HOSTARCHVALUES_ARM64 = eh2;
    Rg2.HOSTARCHVALUES_IA64 = Ag2;
    Rg2.HOSTARCHVALUES_PPC32 = Bg2;
    Rg2.HOSTARCHVALUES_PPC64 = Qg2;
    Rg2.HOSTARCHVALUES_X86 = Zg2;
    Rg2.HostArchValues = pu.createConstMap([oh2, th2, eh2, Ag2, Bg2, Qg2, Zg2]);
    var Dg2 = "windows",
        Gg2 = "linux",
        Fg2 = "darwin",
        Ig2 = "freebsd",
        Yg2 = "netbsd",
        Wg2 = "openbsd",
        Jg2 = "dragonflybsd",
        Xg2 = "hpux",
        Vg2 = "aix",
        Cg2 = "solaris",
        Kg2 = "z_os";
    Rg2.OSTYPEVALUES_WINDOWS = Dg2;
    Rg2.OSTYPEVALUES_LINUX = Gg2;
    Rg2.OSTYPEVALUES_DARWIN = Fg2;
    Rg2.OSTYPEVALUES_FREEBSD = Ig2;
    Rg2.OSTYPEVALUES_NETBSD = Yg2;
    Rg2.OSTYPEVALUES_OPENBSD = Wg2;
    Rg2.OSTYPEVALUES_DRAGONFLYBSD = Jg2;
    Rg2.OSTYPEVALUES_HPUX = Xg2;
    Rg2.OSTYPEVALUES_AIX = Vg2;
    Rg2.OSTYPEVALUES_SOLARIS = Cg2;
    Rg2.OSTYPEVALUES_Z_OS = Kg2;
    Rg2.OsTypeValues = pu.createConstMap([Dg2, Gg2, Fg2, Ig2, Yg2, Wg2, Jg2, Xg2, Vg2, Cg2, Kg2]);
    var Hg2 = "cpp",
        zg2 = "dotnet",
        Eg2 = "erlang",
        Ug2 = "go",
        wg2 = "java",
        $g2 = "nodejs",
        qg2 = "php",
        Ng2 = "python",
        Lg2 = "ruby",
        Mg2 = "webjs";
    Rg2.TELEMETRYSDKLANGUAGEVALUES_CPP = Hg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_DOTNET = zg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_ERLANG = Eg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_GO = Ug2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_JAVA = wg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_NODEJS = $g2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_PHP = qg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_PYTHON = Ng2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_RUBY = Lg2;
    Rg2.TELEMETRYSDKLANGUAGEVALUES_WEBJS = Mg2;
    Rg2.TelemetrySdkLanguageValues = pu.createConstMap([Hg2, zg2, Eg2, Ug2, wg2, $g2, qg2, Ng2, Lg2, Mg2])
});
var jg2 = E((iu) => {
    var n86 = iu && iu.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        a86 = iu && iu.__exportStar || function(A, B) {
            for (var Q in A)
                if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) n86(B, A, Q)
        };
    Object.defineProperty(iu, "__esModule", {
        value: !0
    });
    a86(Sg2(), iu)
});